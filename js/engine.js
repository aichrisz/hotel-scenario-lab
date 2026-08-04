(function () {
  "use strict";
  window.HSL = window.HSL || {};

  // Mesin run & skor — fungsi murni: tanpa DOM, penyimpanan, Date, atau acak.
  function findOption(node, optionId) {
    if (!node || !Array.isArray(node.options)) return null;
    for (var i = 0; i < node.options.length; i++) if (node.options[i].id === optionId) return node.options[i];
    return null;
  }
  function axisScore(sum, n) { return n ? Math.round(100 * sum / (2 * n)) : 0; }
  function numberScore(v) { return typeof v === "number" && isFinite(v); }

  var engine = {
    createRun: function (scenario, lang, nowIso) {
      return { scenarioId: scenario.id, lang: lang, startedAt: nowIso, steps: [] };
    },
    currentNodeId: function (scenario, run) {
      if (!scenario || !scenario.nodes || !run || !Array.isArray(run.steps)) return null;
      var id = scenario.startNode || "n1";
      for (var i = 0; i < run.steps.length; i++) {
        var node = scenario.nodes[id], step = run.steps[i];
        if (!node || node.type !== "decision" || !step || step.node !== id) return null;
        var opt = findOption(node, step.option);
        if (!opt) return null;
        id = opt.next;
      }
      return scenario.nodes[id] ? id : null;
    },
    isFinished: function (scenario, run) {
      var id = this.currentNodeId(scenario, run), node = id ? scenario.nodes[id] : null;
      return !!(node && node.type === "outcome");
    },
    applyChoice: function (scenario, run, optionId) {
      var id = this.currentNodeId(scenario, run), node = id ? scenario.nodes[id] : null;
      if (!node || node.type !== "decision") return run;
      var opt = findOption(node, optionId);
      if (!opt) return run;
      var steps = run.steps.slice();
      steps.push({ node: id, option: optionId });
      return { scenarioId: run.scenarioId, lang: run.lang, startedAt: run.startedAt, steps: steps };
    },
    summarize: function (scenario, run) {
      var sums = { d: 0, l: 0, s: 0 }, verdicts = [], unsafeSteps = [], safe = true;
      var id = scenario.startNode || "n1";
      for (var i = 0; i < run.steps.length; i++) {
        var node = scenario.nodes[id], step = run.steps[i], opt = findOption(node, step.option);
        sums.d += opt.scores.d; sums.l += opt.scores.l; sums.s += opt.scores.s;
        var total = opt.scores.d + opt.scores.l + opt.scores.s;
        var unsafe = !!(opt.flags && opt.flags.unsafe);
        var symbol = unsafe ? "unsafe" : (total === 6 ? "strong" : total >= 3 ? "ok" : "weak");
        if (unsafe) { safe = false; unsafeSteps.push(i + 1); }
        verdicts.push({ index: i + 1, node: id, option: opt.id, phase: node.phase, label: opt.label, feedback: opt.feedback, symbol: symbol });
        id = opt.next;
      }
      var N = run.steps.length, Sd = axisScore(sums.d, N), Sl = axisScore(sums.l, N), Ss = axisScore(sums.s, N);
      var combined = Math.round(0.40 * Sd + 0.25 * Sl + 0.35 * Ss);
      var baseKeys = combined >= 90 ? 5 : combined >= 75 ? 4 : combined >= 60 ? 3 : combined >= 40 ? 2 : 1;
      var keys = safe ? baseKeys : Math.min(baseKeys, 3), outcomeNode = scenario.nodes[id];
      var tips = [], deb = scenario.debrief || { tips: {} };
      if (!safe && deb.safetyTip) tips.push({ kind: "safety", text: deb.safetyTip });
      var axes = [["sop", Ss], ["decision", Sd], ["language", Sl]], low = axes[0];
      for (var a = 1; a < axes.length; a++) if (axes[a][1] < low[1]) low = axes[a];
      var axisTip = deb.tips ? deb.tips[low[0]] : null;
      if (axisTip && !tips.some(function (t) { return t.text === axisTip; })) tips.push({ kind: low[0], text: axisTip });
      if (combined >= 90 && safe && deb.praise && !tips.some(function (t) { return t.text === deb.praise; })) tips.push({ kind: "praise", text: deb.praise });
      return { N: N, sums: sums, scores: { decision: Sd, language: Sl, sop: Ss, combined: combined }, baseKeys: baseKeys, safe: safe, keys: keys, verdicts: verdicts, unsafeSteps: unsafeSteps, outcome: { tone: outcomeNode ? outcomeNode.tone : "mixed", ending: outcomeNode ? outcomeNode.ending : null }, tips: tips.slice(0, 3) };
    },
    recommendNext: function (order, progressMap) {
      progressMap = progressMap || {};
      var i, p;
      for (i = 0; i < order.length; i++) { p = progressMap[order[i]]; if (!p || !p.completed) return { id: order[i] }; }
      for (i = 0; i < order.length; i++) { p = progressMap[order[i]]; if (!p.best || p.best.keys < 5) return { id: order[i] }; }
      return { allMastered: true };
    },

    dateHash: function (dateKey) {
      if (typeof dateKey !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return -1;
      var h = 2166136261 >>> 0;
      for (var i = 0; i < dateKey.length; i++) { h ^= dateKey.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
      h ^= h >>> 15; h = Math.imul(h, 2246822507) >>> 0;
      h ^= h >>> 13; h = Math.imul(h, 3266489909) >>> 0;
      h ^= h >>> 16;
      return h >>> 0;
    },
    trainingOfTheDay: function (order, dateKey) {
      if (!Array.isArray(order) || !order.length) return null;
      var h = this.dateHash(dateKey);
      return h < 0 ? null : order[h % order.length];
    },

    axisStats: function (order, progressMap) {
      var out = { decision: { sum: 0, n: 0, avg: 0 }, language: { sum: 0, n: 0, avg: 0 }, sop: { sum: 0, n: 0, avg: 0 }, samples: 0 };
      progressMap = progressMap || {};
      (Array.isArray(order) ? order : []).forEach(function (slug) {
        var b = progressMap[slug] && progressMap[slug].best;
        if (!b || !numberScore(b.decision) || !numberScore(b.language) || !numberScore(b.sop)) return;
        ["decision", "language", "sop"].forEach(function (axis) { out[axis].sum += b[axis]; out[axis].n += 1; });
        out.samples += 1;
      });
      ["decision", "language", "sop"].forEach(function (axis) { out[axis].avg = out[axis].n ? Math.round(out[axis].sum / out[axis].n) : 0; });
      return out;
    },
    weakAxis: function (order, progressMap, opts) {
      opts = opts || {};
      var stats = this.axisStats(order, progressMap);
      var minSamples = typeof opts.minSamples === "number" ? opts.minSamples : 2;
      if (stats.samples < minSamples) return null;
      var threshold = typeof opts.threshold === "number" ? opts.threshold : 75;
      var maxSlugs = typeof opts.maxSlugs === "number" ? opts.maxSlugs : 3;
      var choices = [["sop", stats.sop.avg], ["decision", stats.decision.avg], ["language", stats.language.avg]], chosen = choices[0];
      for (var i = 1; i < choices.length; i++) if (choices[i][1] < chosen[1]) chosen = choices[i];
      var axis = chosen[0], list = [], pmap = progressMap || {};
      (Array.isArray(order) ? order : []).forEach(function (slug, index) {
        var b = pmap[slug] && pmap[slug].best;
        if (b && numberScore(b[axis]) && b[axis] < threshold) list.push({ slug: slug, score: b[axis], index: index });
      });
      list.sort(function (a, b) { return a.score - b.score || a.index - b.index; });
      return { axis: axis, avg: chosen[1], samples: stats.samples, slugs: list.slice(0, Math.max(0, maxSlugs)).map(function (x) { return x.slug; }) };
    },

    normalizeCatalogOpts: function (opts, categories) {
      opts = opts || {}; categories = Array.isArray(categories) ? categories : [];
      var out = { cat: "all", status: "all", diff: "all", sort: "default" };
      if (categories.indexOf(opts.cat) >= 0) out.cat = opts.cat;
      if (["new", "active", "done", "mastered"].indexOf(opts.status) >= 0) out.status = opts.status;
      if (opts.diff === 1 || opts.diff === 2 || opts.diff === 3 || opts.diff === "1" || opts.diff === "2" || opts.diff === "3") out.diff = Number(opts.diff);
      if (["best", "difficulty"].indexOf(opts.sort) >= 0) out.sort = opts.sort;
      return out;
    },
    statusOfSlug: function (slug, progressMap, activeRunId) {
      if (activeRunId === slug) return "active";
      var p = (progressMap || {})[slug] || {};
      if (p.best && p.best.keys === 5) return "mastered";
      if (p.completed) return "done";
      return "new";
    },
    filterSortCatalog: function (order, scenarios, progressMap, activeRunId, opts, categories) {
      categories = Array.isArray(categories) ? categories : [];
      var raw = opts || {}, normalized = this.normalizeCatalogOpts(raw, categories);
      var status = normalized.status, cat = normalized.cat, diff = normalized.diff;
      var result = [];
      (Array.isArray(order) ? order : []).forEach(function (slug, index) {
        var sc = scenarios && scenarios[slug]; if (!sc) return;
        var st = engine.statusOfSlug(slug, progressMap, activeRunId), p = (progressMap || {})[slug] || {};
        var statusOk = status === "all" || (status === "done" ? !!p.completed : st === status);
        if (statusOk && (cat === "all" || sc.category === cat) && (diff === "all" || sc.difficulty === diff)) result.push({ slug: slug, index: index, score: p.best && numberScore(p.best.combined) ? p.best.combined : null, weak: p.best && raw.axis && numberScore(p.best[raw.axis]) ? p.best[raw.axis] : null, difficulty: sc.difficulty });
      });
      var sort = raw.sort === "weak" ? "weak" : normalized.sort;
      result.sort(function (a, b) {
        if (sort === "best") { if (a.score === null && b.score !== null) return 1; if (a.score !== null && b.score === null) return -1; if (a.score !== null && b.score !== null && a.score !== b.score) return b.score - a.score; }
        if (sort === "difficulty" && a.difficulty !== b.difficulty) return a.difficulty - b.difficulty;
        if (sort === "weak") { if (a.weak === null && b.weak !== null) return 1; if (a.weak !== null && b.weak === null) return -1; if (a.weak !== null && b.weak !== null && a.weak !== b.weak) return a.weak - b.weak; }
        return a.index - b.index;
      });
      return result.map(function (x) { return x.slug; });
    },
    weakestStepIndex: function (scenario, run) {
      if (!scenario || !run || !Array.isArray(run.steps)) return -1;
      var id = scenario.startNode || "n1", unsafeIndex = -1, weakIndex = -1, min = 7;
      for (var i = 0; i < run.steps.length; i++) {
        var node = scenario.nodes && scenario.nodes[id], step = run.steps[i], opt = findOption(node, step && step.option);
        if (!node || node.type !== "decision" || !step || step.node !== id || !opt || !opt.scores) return -1;
        if (opt.flags && opt.flags.unsafe && unsafeIndex < 0) unsafeIndex = i;
        var total = opt.scores.d + opt.scores.l + opt.scores.s;
        if (total < 6 && total < min) { min = total; weakIndex = i; }
        id = opt.next;
      }
      return unsafeIndex >= 0 ? unsafeIndex : weakIndex;
    },
    truncateRun: function (run, index) {
      if (!run || !Array.isArray(run.steps) || index < 0 || index >= run.steps.length) return run;
      return { scenarioId: run.scenarioId, lang: run.lang, startedAt: run.startedAt, steps: run.steps.slice(0, index) };
    }
  };
  window.HSL.engine = engine;
})();
