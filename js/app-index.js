(function () {
  "use strict";
  window.HSL = window.HSL || {};
  var S, I, E, U;
  var CAT_ORDER = ["checkin", "complaint", "upsell", "checkout", "privacy", "escalation"];

  function dataOk() {
    return HSL.data && Array.isArray(HSL.data.order) && HSL.data.order.length === 12 &&
      HSL.data.order.every(function (slug) { return HSL.data.scenarios && HSL.data.scenarios[slug]; });
  }

  function hasLang() {
    var st = S.state;
    return !!(st && st.settings && ["de", "en", "id"].indexOf(st.settings.lang) >= 0);
  }

  function showStoreNotices() {
    var map = { "storage-unavailable": "ui.banner.memory", "corrupt-recovered": "ui.banner.corrupt", "newer-schema": "ui.banner.newer" };
    S.notices.forEach(function (n) {
      if (map[n]) U.showBanner({ kind: "warn", text: I.t(map[n]) });
    });
  }

  // Panel kunjungan pertama (§12 baris 1) — teks trilingual statis, bukan kunci kamus.
  function renderFirstVisit() {
    var host = document.getElementById("first-visit");
    if (!host) return;
    U.clear(host);
    var panel = U.el("div", { "class": "panel first-visit" });
    var line = U.el("p", { "class": "first-visit__line" });
    line.appendChild(U.el("span", { lang: "de" }, "Willkommen"));
    line.appendChild(document.createTextNode(" · "));
    line.appendChild(U.el("span", { lang: "en" }, "Welcome"));
    line.appendChild(document.createTextNode(" · "));
    line.appendChild(U.el("span", { lang: "id" }, "Selamat datang — pilih bahasa Anda."));
    panel.appendChild(line);
    var row = U.el("div", { "class": "btn-row" });
    [["de", "Deutsch"], ["en", "English"], ["id", "Bahasa Indonesia"]].forEach(function (pair) {
      var b = U.el("button", { type: "button", "class": "btn btn--primary", lang: pair[0] }, pair[1]);
      b.addEventListener("click", function () { I.setLang(pair[0]); });
      row.appendChild(b);
    });
    panel.appendChild(row);
    host.appendChild(panel);
  }

  function renderProgressSummary() {
    var host = document.getElementById("progress-summary");
    if (!host) return;
    U.clear(host);
    var progress = S.state.progress || {};
    var done = 0, keysSum = 0, mastered = 0;
    HSL.data.order.forEach(function (slug) {
      var p = progress[slug];
      if (p && p.completed) done++;
      if (p && p.best) {
        keysSum += p.best.keys;
        if (p.best.keys === 5) mastered++;
      }
    });
    if (done === 0) {
      host.appendChild(U.el("p", { "class": "panel" }, I.t("ui.home.empty")));
    } else {
      host.appendChild(U.el("p", { "class": "panel progress-line" }, I.t("ui.home.progress", { done: done, keys: keysSum })));
    }
    if (mastered === 12) {
      host.appendChild(U.el("p", { "class": "panel panel--celebrate" }, I.t("ui.home.mastered")));
    }
  }

  function statusOf(slug) {
    var ar = S.state.activeRun;
    if (ar && ar.scenarioId === slug) return ["ui.home.status.active", "badge badge--active"];
    var p = S.state.progress[slug];
    if (p && p.completed) return ["ui.home.status.done", "badge badge--done"];
    return ["ui.home.status.new", "badge"];
  }

  function card(slug) {
    var sc = HSL.data.scenarios[slug];
    var a = U.cardShell("scenario.html?id=" + slug);
    var meta = U.el("p", { "class": "card__meta" });
    meta.appendChild(U.el("span", null, I.t("ui.home.cat." + sc.category)));
    var diff = U.el("span");
    var dots = "";
    for (var i = 0; i < sc.difficulty; i++) dots += "●";
    diff.appendChild(U.el("span", { "class": "dots", "aria-hidden": "true" }, dots + " "));
    diff.appendChild(document.createTextNode(I.t("ui.home.diff." + sc.difficulty)));
    meta.appendChild(diff);
    meta.appendChild(U.el("span", null, I.t("ui.home.minutes", { m: sc.minutes })));
    a.appendChild(meta);
    a.appendChild(U.el("h3", null, I.text(sc.title)));
    a.appendChild(U.el("p", { "class": "card__summary" }, I.text(sc.summary)));
    var status = U.el("p", { "class": "card__status" });
    var st = statusOf(slug);
    status.appendChild(U.el("span", { "class": st[1] }, I.t(st[0])));
    var p = S.state.progress[slug];
    if (p && p.best) {
      var srResult = I.t("ui.debrief.result", { label: I.t("ui.debrief.grade." + p.best.keys), keys: p.best.keys });
      status.appendChild(U.keysRow(p.best.keys, p.best.safe, srResult));
      status.appendChild(U.el("span", null, I.t("ui.home.best", { pct: p.best.combined })));
    }
    a.appendChild(status);
    return a;
  }

  function renderCatalog() {
    var host = document.getElementById("catalog");
    if (!host) return;
    U.clear(host);
    CAT_ORDER.forEach(function (cat) {
      var slugs = HSL.data.order.filter(function (slug) { return HSL.data.scenarios[slug].category === cat; });
      if (!slugs.length) return;
      var section = U.el("section", { "class": "catalog-section", id: "cat-" + cat });
      section.appendChild(U.el("h2", null, I.t("ui.home.cat." + cat)));
      var grid = U.el("div", { "class": "catalog-grid" });
      slugs.forEach(function (slug) { grid.appendChild(card(slug)); });
      section.appendChild(grid);
      host.appendChild(section);
    });
  }

  function renderDynamic() {
    var fv = document.getElementById("first-visit");
    if (fv) U.clear(fv);
    renderProgressSummary();
    renderCatalog();
  }

  function boot() {
    S = HSL.store; I = HSL.i18n; E = HSL.engine; U = HSL.ui;
    S.load();
    U.applyMotionClass();
    I.applyDocument();
    U.applyI18n(document);
    U.langSwitcher(document.getElementById("lang-switch-slot"));
    showStoreNotices();
    if (!dataOk()) {
      U.showBanner({ kind: "danger", text: I.t("ui.player.loadError"), dismissible: false });
      return;
    }
    I.onLangChange = function () {
      U.applyI18n(document);
      renderDynamic();
    };
    if (!hasLang()) {
      renderFirstVisit();
      return; // Konten statis DE tetap tampil sampai bahasa dipilih (§12 baris 1).
    }
    renderDynamic();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
