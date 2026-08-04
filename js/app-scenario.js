(function () {
  "use strict";
  window.HSL = window.HSL || {};
  var S, I, E, U;
  var sc = null;          // objek Scenario aktif
  var run = null;         // objek run aktif (bentuk §7.2 activeRun)
  var view = "briefing";  // "briefing" | "node" | "feedback" | "result"
  var resumeAvailable = false;
  var fatalShown = false;
  var skipFocus = false; // true saat render ulang karena alih bahasa (fokus tidak dipindah)
  var JOINERS = { de: " und ", en: " and ", id: " dan " };

  function nowIso() { return new Date().toISOString(); }

  function player() { return document.getElementById("player"); }

  function dataOk() {
    return HSL.data && Array.isArray(HSL.data.order) && HSL.data.order.length >= 12 &&
      HSL.data.order.every(function (slug) { return HSL.data.scenarios && HSL.data.scenarios[slug]; });
  }

  function showStoreNotices() {
    var map = { "storage-unavailable": "ui.banner.memory", "corrupt-recovered": "ui.banner.corrupt", "newer-schema": "ui.banner.newer" };
    S.notices.forEach(function (n) {
      if (map[n]) U.showBanner({ kind: "warn", text: I.t(map[n]) });
    });
  }

  function paragraphs(text, cls) {
    var box = U.el("div", cls ? { "class": cls } : null);
    String(text).split("\n\n").forEach(function (para) {
      if (para.trim()) box.appendChild(U.el("p", null, para));
    });
    return box;
  }

  function mount(children) {
    var host = player();
    if (!host) return null;
    U.clear(host);
    var wrap = U.el("div", { "class": "view view-enter" }, children);
    host.appendChild(wrap);
    return wrap;
  }

  function contextBody() {
    var dl = U.el("dl");
    [["ui.player.ctxPlace", sc.context.place],
     ["ui.player.ctxSituation", sc.context.situation],
     ["ui.player.ctxGuest", sc.context.guest],
     ["ui.player.ctxConstraints", sc.context.constraints]].forEach(function (row) {
      dl.appendChild(U.el("dt", null, I.t(row[0])));
      dl.appendChild(U.el("dd", null, I.text(row[1])));
    });
    return U.el("div", { "class": "context-card" }, [dl]);
  }

  function contextDetails() {
    var pinned = typeof window.matchMedia === "function" && window.matchMedia("(min-width: 1024px)").matches;
    var det = U.el("details", { "class": "details-context" + (pinned ? " ctx-pinned" : ""), open: pinned ? true : null });
    det.appendChild(U.el("summary", null, I.t("ui.player.context")));
    det.appendChild(contextBody());
    return det;
  }

  // ---- Keadaan (a): Briefing ----
  function renderBriefing() {
    view = "briefing";
    var kids = [U.el("h1", null, I.text(sc.title))];
    var card = U.el("div", { "class": "panel context-card" });
    card.appendChild(contextBody());
    kids.push(card);
    kids.push(U.el("h2", null, I.t("ui.player.goals")));
    var ul = U.el("ul", { "class": "goals-list" });
    sc.goals.forEach(function (g) { ul.appendChild(U.el("li", null, I.text(g))); });
    kids.push(ul);
    if (resumeAvailable && run) {
      var panel = U.el("div", { "class": "panel" });
      panel.appendChild(U.el("h2", null, I.t("ui.player.resumeTitle")));
      panel.appendChild(U.el("p", null, I.t("ui.player.resumeBody", { n: run.steps.length + 1 })));
      var row = U.el("div", { "class": "btn-row" });
      var bResume = U.el("button", { type: "button", "class": "btn btn--primary" }, I.t("ui.player.resume"));
      bResume.addEventListener("click", function () {
        resumeAvailable = false;
        if (E.isFinished(sc, run)) renderResult(true); else renderNode();
      });
      var bRestart = U.el("button", { type: "button", "class": "btn" }, I.t("ui.player.restart"));
      bRestart.addEventListener("click", function () { resumeAvailable = false; startRun(); });
      row.appendChild(bResume);
      row.appendChild(bRestart);
      panel.appendChild(row);
      kids.push(panel);
    } else {
      var bStart = U.el("button", { type: "button", "class": "btn btn--primary" }, I.t("ui.player.start"));
      bStart.addEventListener("click", startRun);
      kids.push(U.el("div", { "class": "btn-row" }, [bStart]));
    }
    mount(kids);
    skipFocus = false;
  }

  // Mulai run baru; run aktif lama (skenario apa pun) dibuang tanpa dialog (§12 baris 9).
  function startRun() {
    var fresh = E.createRun(sc, I.lang(), nowIso());
    S.save(function (st) { st.activeRun = fresh; });
    run = S.state.activeRun || fresh;
    renderNode();
  }

  function statusRow(stepNumber, phase) {
    var row = U.el("div", { "class": "player-status" });
    row.appendChild(U.el("a", { href: "index.html" }, "← " + I.t("ui.player.exit")));
    row.appendChild(U.el("p", { "class": "player-status__step" },
      I.t("ui.player.step", { n: stepNumber, phase: I.text(phase) })));
    return row;
  }

  function optionButtons(node, chosenId) {
    var box = U.el("div", { "class": "options" });
    node.options.forEach(function (opt) {
      var b = U.el("button", {
        type: "button",
        "class": "btn btn--option" + (chosenId === opt.id ? " is-chosen" : ""),
        disabled: chosenId ? true : null
      }, I.text(opt.label));
      if (!chosenId) {
        b.addEventListener("click", function () { choose(opt.id); });
      }
      box.appendChild(b);
    });
    return box;
  }

  function nodeLayout(mainKids) {
    var layout = U.el("div", { "class": "player-layout" });
    var main = U.el("div", { "class": "player-main" }, mainKids);
    layout.appendChild(main);
    layout.appendChild(contextDetails());
    return layout;
  }

  // ---- Keadaan (b): Simpul keputusan ----
  function renderNode() {
    view = "node";
    var nodeId = E.currentNodeId(sc, run);
    var node = nodeId ? sc.nodes[nodeId] : null;
    if (!node || node.type !== "decision") { renderResult(true); return; }
    var kids = [statusRow(run.steps.length + 1, node.phase)];
    kids.push(paragraphs(I.text(node.narration), "narration"));
    if (node.guestLine) kids.push(U.el("blockquote", { "class": "quote-guest" }, I.text(node.guestLine)));
    kids.push(U.el("h2", null, I.t("ui.player.question")));
    kids.push(optionButtons(node, null));
    var wrap = mount([nodeLayout(kids)]);
    if (wrap && !skipFocus) U.focusHeading(wrap.querySelector(".player-status__step"));
    skipFocus = false;
  }

  function choose(optionId) {
    var next = E.applyChoice(sc, run, optionId);
    if (next === run) return;
    run = next;
    S.save(function (st) { st.activeRun = run; });
    renderFeedback();
  }

  // ---- Keadaan (c): Umpan balik langsung ----
  function renderFeedback() {
    view = "feedback";
    var last = run.steps[run.steps.length - 1];
    var node = sc.nodes[last.node];
    var opt = null;
    node.options.forEach(function (o) { if (o.id === last.option) opt = o; });
    var kids = [statusRow(run.steps.length, node.phase)];
    kids.push(paragraphs(I.text(node.narration), "narration"));
    if (node.guestLine) kids.push(U.el("blockquote", { "class": "quote-guest" }, I.text(node.guestLine)));
    kids.push(U.el("h2", null, I.t("ui.player.question")));
    kids.push(optionButtons(node, opt.id));
    var isUnsafe = !!(opt.flags && opt.flags.unsafe);
    var cardEl = U.el("div", { "class": "feedback-card" + (isUnsafe ? " feedback-card--unsafe" : "") });
    var head = U.el("h3", null, I.t("ui.player.feedback"));
    cardEl.appendChild(head);
    cardEl.appendChild(U.el("p", { "class": "axis-chip" },
      I.t("ui.player.verdict", { d: opt.scores.d, l: opt.scores.l, s: opt.scores.s })));
    if (isUnsafe) {
      var note = U.el("div", { "class": "safety-note" });
      note.appendChild(U.icon("danger"));
      note.appendChild(U.el("p", null, [U.el("strong", null, I.t("ui.player.safetyNote"))]));
      cardEl.appendChild(note);
    }
    cardEl.appendChild(paragraphs(I.text(opt.feedback)));
    var bNext = U.el("button", { type: "button", "class": "btn btn--primary" }, I.t("ui.player.continue"));
    bNext.addEventListener("click", function () {
      if (E.isFinished(sc, run)) renderResult(true); else renderNode();
    });
    cardEl.appendChild(U.el("div", { "class": "btn-row" }, [bNext]));
    kids.push(cardEl);
    mount([nodeLayout(kids)]);
    if (!skipFocus) U.focusHeading(head);
    skipFocus = false;
  }

  // ---- Keadaan (d): Hasil & debrief ----
  function renderResult(record) {
    view = "result";
    var summary = E.summarize(sc, run);
    // Attempts bertambah hanya sekali per penyelesaian (§7.3): rekam hanya bila run aktif ini masih tercatat.
    if (record && S.state.activeRun && S.state.activeRun.scenarioId === sc.id) {
      var at = nowIso();
      S.save(function (st) {
        S.recordResult(sc.id, {
          combined: summary.scores.combined,
          decision: summary.scores.decision,
          language: summary.scores.language,
          sop: summary.scores.sop,
          keys: summary.keys,
          safe: summary.safe,
          at: at
        }, at);
        delete st.activeRun;
      });
    }
    var kids = [U.el("h1", null, I.text(sc.title))];
    kids.push(paragraphs(I.text(summary.outcome.ending), "outcome outcome--" + summary.outcome.tone));

    var block = U.el("div", { "class": "result-block" });
    var heading = U.el("h2", null, I.t("ui.debrief.result", {
      label: I.t("ui.debrief.grade." + summary.keys), keys: summary.keys
    }));
    block.appendChild(heading);
    block.appendChild(U.keysRow(summary.keys, summary.safe));
    [["ui.debrief.axis.d", summary.scores.decision],
     ["ui.debrief.axis.l", summary.scores.language],
     ["ui.debrief.axis.s", summary.scores.sop]].forEach(function (row) {
      block.appendChild(U.scoreBar(I.t("ui.debrief.axis", { axis: I.t(row[0]), pct: row[1] }), row[1]));
    });
    if (!summary.safe) {
      var joiner = JOINERS[I.lang()] || JOINERS.id;
      var note = U.el("div", { "class": "safety-note" });
      note.appendChild(U.icon("danger"));
      note.appendChild(U.el("p", null, I.t("ui.debrief.safetyCap", { steps: summary.unsafeSteps.join(joiner) })));
      block.appendChild(note);
    }
    kids.push(block);

    kids.push(U.el("h2", null, I.t("ui.debrief.title")));
    var tips = U.el("ul", { "class": "debrief-tips" });
    summary.tips.forEach(function (tip) {
      tips.appendChild(U.el("li", { "class": tip.kind === "safety" ? "tip--safety" : null },
        [U.el("p", null, I.text(tip.text))]));
    });
    kids.push(tips);

    kids.push(U.el("h2", null, I.t("ui.debrief.path")));
    var SYM = { strong: "✓", ok: "△", weak: "✗", unsafe: "⚠" };
    var ol = U.el("ol", { "class": "path-recap" });
    summary.verdicts.forEach(function (v) {
      var det = U.el("details");
      var sum = U.el("summary");
      sum.appendChild(U.el("span", { "class": "verdict-sym verdict-sym--" + v.symbol, "aria-hidden": "true" }, SYM[v.symbol]));
      sum.appendChild(U.el("span", { "class": "verdict-label" }, I.t("ui.debrief.sym." + v.symbol)));
      sum.appendChild(document.createTextNode(I.t("ui.player.step", { n: v.index, phase: I.text(v.phase) })));
      det.appendChild(sum);
      var body = U.el("div", { "class": "recap-body" });
      body.appendChild(U.el("p", null, [U.el("strong", null, I.text(v.label))]));
      body.appendChild(paragraphs(I.text(v.feedback)));
      det.appendChild(body);
      ol.appendChild(U.el("li", null, [det]));
    });
    kids.push(ol);

    var actions = U.el("div", { "class": "btn-row" });
    var weakIndex = E.weakestStepIndex(sc, run);
    if (weakIndex >= 0 && run.steps[weakIndex]) {
      var weakNode = sc.nodes[run.steps[weakIndex].node];
      var weakWrap = U.el("div", { "class": "retry-weak" });
      var bWeak = U.el("button", { type: "button", "class": "btn btn--primary" }, I.t("ui.debrief.retryWeak"));
      weakWrap.appendChild(bWeak);
      weakWrap.appendChild(U.el("p", { "class": "retry-weak__hint" }, I.t("ui.debrief.retryWeakHint", { n: weakIndex + 1, phase: I.text(weakNode.phase) })));
      bWeak.addEventListener("click", function () {
        run = E.truncateRun(run, weakIndex);
        S.save(function (st) { st.activeRun = run; });
        renderNode();
      });
      actions.appendChild(weakWrap);
    }
    var bRetry = U.el("button", { type: "button", "class": "btn" }, I.t("ui.debrief.retry"));
    bRetry.addEventListener("click", startRun);
    actions.appendChild(bRetry);
    actions.appendChild(U.el("a", { "class": "btn", href: "index.html" }, I.t("ui.nav.backToCatalog")));
    var rec = E.recommendNext(HSL.data.order, S.state.progress);
    if (rec.id) {
      actions.appendChild(U.el("a", { "class": "btn", href: "scenario.html?id=" + rec.id }, I.t("ui.debrief.next")));
    }
    kids.push(actions);
    if (rec.allMastered) kids.push(U.el("p", { "class": "panel panel--celebrate" }, I.t("ui.home.mastered")));

    mount(kids);
    if (!skipFocus) U.focusHeading(heading);
    skipFocus = false;
  }

  function renderErrorPanel(textKey) {
    var kids = [U.el("h1", null, I.t("ui.nav.appName"))];
    var panel = U.el("div", { "class": "panel player-error" });
    panel.appendChild(U.el("p", null, I.t(textKey)));
    panel.appendChild(U.el("a", { "class": "btn btn--primary", href: "index.html" }, I.t("ui.nav.backToCatalog")));
    kids.push(panel);
    mount(kids);
  }

  function rerender() {
    if (run && S.state.activeRun && S.state.activeRun.scenarioId === sc.id) {
      S.save(function (st) { if (st.activeRun) st.activeRun.lang = I.lang(); });
      run = S.state.activeRun;
    }
    if (!sc) return;
    skipFocus = true;
    if (view === "briefing") renderBriefing();
    else if (view === "node") renderNode();
    else if (view === "feedback") renderFeedback();
    else renderResult(false);
  }

  function boot() {
    S = HSL.store; I = HSL.i18n; E = HSL.engine; U = HSL.ui;
    S.load();
    U.applyMotionClass();
    I.applyDocument();
    U.applyI18n(document);
    U.langSwitcher(document.getElementById("lang-switch-slot"));
    // §12 baris 11: galat runtime tak tertangani → banner permanen + muat ulang.
    window.onerror = function () {
      if (fatalShown) return false;
      fatalShown = true;
      U.showBanner({
        kind: "danger", text: I.t("ui.player.jsError"), dismissible: false,
        action: { label: I.t("ui.player.reload"), onClick: function () { window.location.reload(); } }
      });
      return false;
    };
    showStoreNotices();
    if (!dataOk()) { renderErrorPanel("ui.player.loadError"); return; }
    var id = new window.URLSearchParams(window.location.search).get("id");
    sc = id ? HSL.data.scenarios[id] : null;
    if (!sc) { renderErrorPanel("ui.player.notFound"); return; }
    I.onLangChange = function () {
      U.applyI18n(document);
      rerender();
    };
    var ar = S.state.activeRun;
    if (ar && ar.scenarioId === sc.id && E.currentNodeId(sc, ar) !== null) {
      run = ar;
      resumeAvailable = true;
    }
    renderBriefing();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
