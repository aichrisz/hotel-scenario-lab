(function () {
  "use strict";
  window.HSL = window.HSL || {};

  // Mesin run & skor — fungsi murni: tanpa DOM, tanpa penyimpanan, tanpa Date.
  function findOption(node, optionId) {
    if (!node || !Array.isArray(node.options)) return null;
    for (var i = 0; i < node.options.length; i++) {
      if (node.options[i].id === optionId) return node.options[i];
    }
    return null;
  }

  function axisScore(sum, n) { return Math.round(100 * sum / (2 * n)); }

  var engine = {
    createRun: function (scenario, lang, nowIso) {
      return { scenarioId: scenario.id, lang: lang, startedAt: nowIso, steps: [] };
    },

    // Telusuri dari n1 mengikuti steps; steps korup → null.
    currentNodeId: function (scenario, run) {
      if (!scenario || !scenario.nodes || !run || !Array.isArray(run.steps)) return null;
      var id = scenario.startNode || "n1";
      for (var i = 0; i < run.steps.length; i++) {
        var node = scenario.nodes[id];
        var step = run.steps[i];
        if (!node || node.type !== "decision" || !step || step.node !== id) return null;
        var opt = findOption(node, step.option);
        if (!opt) return null;
        id = opt.next;
      }
      return scenario.nodes[id] ? id : null;
    },

    isFinished: function (scenario, run) {
      var id = this.currentNodeId(scenario, run);
      var node = id ? scenario.nodes[id] : null;
      return !!(node && node.type === "outcome");
    },

    // Kembalikan run BARU (immutable); optionId tak sah → run lama tanpa perubahan.
    applyChoice: function (scenario, run, optionId) {
      var id = this.currentNodeId(scenario, run);
      var node = id ? scenario.nodes[id] : null;
      if (!node || node.type !== "decision") return run;
      var opt = findOption(node, optionId);
      if (!opt) return run;
      var steps = run.steps.slice();
      steps.push({ node: id, option: optionId });
      return { scenarioId: run.scenarioId, lang: run.lang, startedAt: run.startedAt, steps: steps };
    },

    // Rubrik §9 — hanya sah bila isFinished.
    summarize: function (scenario, run) {
      var sums = { d: 0, l: 0, s: 0 };
      var verdicts = [];
      var unsafeSteps = [];
      var safe = true;
      var id = scenario.startNode || "n1";
      for (var i = 0; i < run.steps.length; i++) {
        var node = scenario.nodes[id];
        var opt = findOption(node, run.steps[i].option);
        sums.d += opt.scores.d;
        sums.l += opt.scores.l;
        sums.s += opt.scores.s;
        var total = opt.scores.d + opt.scores.l + opt.scores.s;
        var isUnsafe = !!(opt.flags && opt.flags.unsafe);
        var symbol = isUnsafe ? "unsafe" : (total === 6 ? "strong" : total >= 3 ? "ok" : "weak");
        if (isUnsafe) { safe = false; unsafeSteps.push(i + 1); }
        verdicts.push({
          index: i + 1,
          node: id,
          option: opt.id,
          phase: node.phase,
          label: opt.label,
          feedback: opt.feedback,
          symbol: symbol
        });
        id = opt.next;
      }
      var N = run.steps.length;
      var Sd = axisScore(sums.d, N);
      var Sl = axisScore(sums.l, N);
      var Ss = axisScore(sums.s, N);
      var combined = Math.round(0.40 * Sd + 0.25 * Sl + 0.35 * Ss);
      var baseKeys = combined >= 90 ? 5 : combined >= 75 ? 4 : combined >= 60 ? 3 : combined >= 40 ? 2 : 1;
      var keys = safe ? baseKeys : Math.min(baseKeys, 3);
      var outcomeNode = scenario.nodes[id];

      // Tips §9.4: (1) safetyTip bila tak aman; (2) sumbu terendah, seri → SOP > Keputusan > Bahasa;
      // (3) praise bila gabungan ≥ 90 dan aman. Maksimal 3, tanpa duplikat objek teks.
      var tips = [];
      var deb = scenario.debrief || { tips: {} };
      if (!safe && deb.safetyTip) tips.push({ kind: "safety", text: deb.safetyTip });
      var axes = [["sop", Ss], ["decision", Sd], ["language", Sl]];
      var low = axes[0];
      for (var a = 1; a < axes.length; a++) { if (axes[a][1] < low[1]) low = axes[a]; }
      var axisTip = deb.tips ? deb.tips[low[0]] : null;
      if (axisTip && !tips.some(function (t) { return t.text === axisTip; })) {
        tips.push({ kind: low[0], text: axisTip });
      }
      if (combined >= 90 && safe && deb.praise && !tips.some(function (t) { return t.text === deb.praise; })) {
        tips.push({ kind: "praise", text: deb.praise });
      }
      tips = tips.slice(0, 3);

      return {
        N: N,
        sums: sums,
        scores: { decision: Sd, language: Sl, sop: Ss, combined: combined },
        baseKeys: baseKeys,
        safe: safe,
        keys: keys,
        verdicts: verdicts,
        unsafeSteps: unsafeSteps,
        outcome: { tone: outcomeNode ? outcomeNode.tone : "mixed", ending: outcomeNode ? outcomeNode.ending : null },
        tips: tips
      };
    },

    // Rekomendasi §9.4: pertama belum selesai; lalu pertama dengan best.keys < 5; selain itu semua dikuasai.
    recommendNext: function (order, progressMap) {
      progressMap = progressMap || {};
      var i, p;
      for (i = 0; i < order.length; i++) {
        p = progressMap[order[i]];
        if (!p || !p.completed) return { id: order[i] };
      }
      for (i = 0; i < order.length; i++) {
        p = progressMap[order[i]];
        if (!p.best || p.best.keys < 5) return { id: order[i] };
      }
      return { allMastered: true };
    }
  };

  window.HSL.engine = engine;
})();
