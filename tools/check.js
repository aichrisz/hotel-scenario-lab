(function () {
  "use strict";
  window.HSL = window.HSL || {};
  var check = (HSL.check = HSL.check || {});

  var ORDER12 = [
    "sc-01-checkin-standard", "sc-02-checkin-no-reservation",
    "sc-03-checkin-language-barrier", "sc-04-complaint-noise",
    "sc-05-complaint-billing", "sc-06-complaint-review-threat",
    "sc-07-upsell-arrival", "sc-08-upsell-services",
    "sc-09-checkout-rush", "sc-10-checkout-minibar-dispute",
    "sc-11-privacy-caller", "sc-12-escalation-collapse"
  ];
  var LANGS = ["de", "en", "id"];
  var CATS = ["checkin", "complaint", "upsell", "checkout", "privacy", "escalation"];
  var SOPS = ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8"];

  function res(id, name, pass, detail) {
    return { id: id, name: name, pass: !!pass, detail: detail || "" };
  }

  function isText3(v) {
    return !!v && typeof v === "object" &&
      LANGS.every(function (L) { return typeof v[L] === "string" && v[L].trim().length > 0; });
  }

  function paramsOf(s) {
    var m = String(s).match(/\{(\w+)\}/g) || [];
    return m.map(function (x) { return x.slice(1, -1); }).sort().join(",");
  }

  // DICT-PARITY: himpunan kunci identik, nilai non-kosong, parameter konsisten.
  function dictParity() {
    var dict = HSL.i18n && HSL.i18n.dict;
    if (!dict || !dict.de || !dict.en || !dict.id) return res("DICT-PARITY", "paritas kamus", false, "kamus tidak lengkap termuat");
    var bad = [];
    var kd = Object.keys(dict.de).sort(), ke = Object.keys(dict.en).sort(), ki = Object.keys(dict.id).sort();
    if (kd.join("") !== ke.join("") || kd.join("") !== ki.join("")) {
      bad.push("himpunan kunci berbeda (de " + kd.length + " / en " + ke.length + " / id " + ki.length + ")");
    }
    kd.forEach(function (k) {
      LANGS.forEach(function (L) {
        var v = dict[L][k];
        if (typeof v !== "string" || !v.trim()) bad.push(L + ":" + k + " kosong");
      });
      if (typeof dict.en[k] === "string" && typeof dict.id[k] === "string") {
        var p = paramsOf(dict.de[k]);
        if (paramsOf(dict.en[k]) !== p || paramsOf(dict.id[k]) !== p) bad.push(k + " parameter tidak konsisten");
      }
    });
    return res("DICT-PARITY", "paritas 3 kamus UI", bad.length === 0, bad.slice(0, 5).join("; "));
  }

  // REG-ORDER: 12 slug persis §8.1, unik, objek skenario ada dengan id sama.
  function regOrder() {
    var data = HSL.data || { scenarios: {}, order: [] };
    var order = Array.isArray(data.order) ? data.order : [];
    var bad = [];
    if (order.length !== 12) bad.push(order.length + " dari 12 slug");
    ORDER12.forEach(function (slug, i) {
      if (order[i] !== slug) bad.push("posisi " + (i + 1) + " ≠ " + slug);
    });
    var seen = {};
    order.forEach(function (slug) {
      if (seen[slug]) bad.push("duplikat " + slug);
      seen[slug] = true;
      var sc = data.scenarios && data.scenarios[slug];
      if (!sc) bad.push(slug + " tanpa objek");
      else if (sc.id !== slug) bad.push(slug + " id tidak cocok");
    });
    return res("REG-ORDER", "registri 12 skenario", bad.length === 0, bad.slice(0, 4).join("; "));
  }

  // SC-FIELDS: bidang wajib §6.1.
  function scFields(slug, sc) {
    var bad = [];
    if (sc.id !== slug) bad.push("id");
    if (CATS.indexOf(sc.category) < 0) bad.push("category");
    if (!(Number.isInteger(sc.difficulty) && sc.difficulty >= 1 && sc.difficulty <= 3)) bad.push("difficulty");
    if (!(Number.isInteger(sc.minutes) && sc.minutes >= 3 && sc.minutes <= 10)) bad.push("minutes");
    if (sc.startNode !== "n1") bad.push("startNode");
    if (!isText3(sc.title)) bad.push("title");
    if (!isText3(sc.summary)) bad.push("summary");
    var ctx = sc.context;
    if (!ctx || !isText3(ctx.place) || !isText3(ctx.situation) || !isText3(ctx.guest) || !isText3(ctx.constraints)) bad.push("context");
    if (!Array.isArray(sc.goals) || sc.goals.length < 2 || sc.goals.length > 3 || !sc.goals.every(isText3)) bad.push("goals");
    var d = sc.debrief;
    if (!d || !d.tips || !isText3(d.tips.decision) || !isText3(d.tips.language) || !isText3(d.tips.sop) ||
        !isText3(d.safetyTip) || !isText3(d.praise)) bad.push("debrief");
    if (!Array.isArray(sc.sopRefs) || sc.sopRefs.length === 0 ||
        !sc.sopRefs.every(function (p) { return SOPS.indexOf(p) >= 0; })) bad.push("sopRefs");
    if (!sc.nodes || typeof sc.nodes !== "object") bad.push("nodes");
    return res("SC-FIELDS-" + slug, "bidang wajib", bad.length === 0, bad.join(", "));
  }

  // SC-TEXT3: kelengkapan tiga bahasa, batas panjang §8.2.11, tanpa markup.
  function scText3(slug, sc) {
    var bad = [];
    function noMarkup(t3, path) {
      LANGS.forEach(function (L) {
        if (typeof t3[L] === "string" && /<[a-zA-Z]/.test(t3[L])) bad.push(path + "." + L + " memuat markup");
      });
    }
    function t3check(t3, path, max) {
      if (!isText3(t3)) { bad.push(path + " tidak lengkap 3 bahasa"); return; }
      noMarkup(t3, path);
      if (max) {
        LANGS.forEach(function (L) {
          if (t3[L].length > max) bad.push(path + "." + L + " " + t3[L].length + " > " + max);
        });
      }
    }
    t3check(sc.title, "title");
    t3check(sc.summary, "summary");
    if (sc.context) {
      ["place", "situation", "guest", "constraints"].forEach(function (f) { t3check(sc.context[f], "context." + f); });
    }
    (sc.goals || []).forEach(function (g, i) { t3check(g, "goals[" + i + "]"); });
    if (sc.debrief) {
      ["decision", "language", "sop"].forEach(function (f) { t3check(sc.debrief.tips && sc.debrief.tips[f], "debrief.tips." + f); });
      t3check(sc.debrief.safetyTip, "debrief.safetyTip");
      t3check(sc.debrief.praise, "debrief.praise");
    }
    Object.keys(sc.nodes || {}).forEach(function (nid) {
      var n = sc.nodes[nid];
      if (n.type === "decision") {
        t3check(n.phase, nid + ".phase");
        t3check(n.narration, nid + ".narration", 700);
        if (n.guestLine !== null && n.guestLine !== undefined) t3check(n.guestLine, nid + ".guestLine", 240);
        (n.options || []).forEach(function (o) {
          t3check(o.label, nid + "." + o.id + ".label", 140);
          t3check(o.feedback, nid + "." + o.id + ".feedback", 350);
        });
      } else if (n.type === "outcome") {
        t3check(n.ending, nid + ".ending", 700);
      } else {
        bad.push(nid + " type tak dikenal");
      }
    });
    return res("SC-TEXT3-" + slug, "Text3 lengkap & batas panjang", bad.length === 0, bad.slice(0, 5).join("; "));
  }

  // SC-GRAF: aturan graf §6.2.
  function scGraf(slug, sc) {
    var bad = [];
    var nodes = sc.nodes || {};
    var ids = Object.keys(nodes);
    if (!nodes.n1 || nodes.n1.type !== "decision") bad.push("n1 absen/bukan decision");
    ids.forEach(function (nid) {
      var n = nodes[nid];
      if (n.type === "decision") {
        var opts = n.options || [];
        if (opts.length < 3 || opts.length > 4) bad.push(nid + " " + opts.length + " opsi");
        var seen = {};
        opts.forEach(function (o) {
          if (["a", "b", "c", "d"].indexOf(o.id) < 0 || seen[o.id]) bad.push(nid + " id opsi " + o.id);
          seen[o.id] = true;
          if (!nodes[o.next]) bad.push(nid + "." + o.id + " next " + o.next + " tak ada");
        });
      }
    });
    // Jangkauan dari n1 + enumerasi jalur (graf kecil) + deteksi siklus.
    var reach = {};
    var pathBad = [];
    function walk(nid, depth, trail) {
      if (trail.indexOf(nid) >= 0) { pathBad.push("siklus di " + nid); return; }
      reach[nid] = true;
      var n = nodes[nid];
      if (!n) return;
      if (n.type === "outcome") {
        if (depth < 3 || depth > 5) pathBad.push("jalur " + depth + " simpul ke " + nid);
        return;
      }
      if (depth >= 12) { pathBad.push("jalur terlalu dalam di " + nid); return; }
      (n.options || []).forEach(function (o) {
        if (nodes[o.next]) walk(o.next, depth + 1, trail.concat(nid));
      });
    }
    if (nodes.n1) walk("n1", 0, []);
    bad = bad.concat(pathBad.slice(0, 4));
    ids.forEach(function (nid) { if (!reach[nid]) bad.push(nid + " yatim"); });
    ids.forEach(function (nid) {
      var n = nodes[nid];
      if (n.type === "outcome" && ["good", "mixed", "poor"].indexOf(n.tone) < 0) bad.push(nid + " tone");
    });
    return res("SC-GRAF-" + slug, "DAG, jalur 3–5, tanpa yatim", bad.length === 0, bad.slice(0, 5).join("; "));
  }

  // SC-RUBRIK: aturan skor & bendera §8.2.
  function scRubrik(slug, sc) {
    var bad = [];
    var hasEscalate = false;
    Object.keys(sc.nodes || {}).forEach(function (nid) {
      var n = sc.nodes[nid];
      if (n.type !== "decision") return;
      var perfect = 0, lowSum = 0;
      var combos = {};
      (n.options || []).forEach(function (o) {
        var s = o.scores || {};
        ["d", "l", "s"].forEach(function (ax) {
          if ([0, 1, 2].indexOf(s[ax]) < 0) bad.push(nid + "." + o.id + " skor " + ax);
        });
        if (s.d === 2 && s.l === 2 && s.s === 2) perfect++;
        if (s.d + s.l + s.s <= 2) lowSum++;
        var key = s.d + "/" + s.l + "/" + s.s + ">" + o.next;
        if (combos[key]) bad.push(nid + " duplikat triple+next " + key);
        combos[key] = true;
        var f = o.flags || {};
        if (f.unsafe && f.escalate) bad.push(nid + "." + o.id + " unsafe+escalate");
        if (f.unsafe && !(s.s === 0 && s.d <= 1)) bad.push(nid + "." + o.id + " unsafe wajib s=0,d<=1");
        if (f.escalate) {
          hasEscalate = true;
          if (!(s.d >= 1 && s.s >= 1)) bad.push(nid + "." + o.id + " escalate wajib d>=1,s>=1");
        }
      });
      if (perfect !== 1) bad.push(nid + " opsi 2/2/2 = " + perfect);
      if (lowSum < 1) bad.push(nid + " tanpa opsi berjumlah <= 2");
    });
    if (!hasEscalate) bad.push("tanpa opsi escalate di skenario");
    return res("SC-RUBRIK-" + slug, "rubrik opsi & bendera", bad.length === 0, bad.slice(0, 5).join("; "));
  }

  // GOLD-A…D: kasus emas §9.5 terhadap HSL.engine (fixture sintetis Tugas 5).
  function golds() {
    var out = [];
    if (!HSL.engine) {
      ["A", "B", "C", "D"].forEach(function (k) { out.push(res("GOLD-" + k, "kasus emas", false, "engine absen")); });
      return out;
    }
    function t3(s) { return { de: s, en: s, id: s }; }
    function opt(id, d, l, s, next, unsafe) {
      var o = { id: id, label: t3("o" + id), scores: { d: d, l: l, s: s }, feedback: t3("f"), next: next };
      if (unsafe) o.flags = { unsafe: true };
      return o;
    }
    function node(opts) { return { type: "decision", phase: t3("Fase"), narration: t3("n"), guestLine: null, options: opts }; }
    var sc = {
      id: "gold", startNode: "n1",
      debrief: { tips: { decision: t3("TD"), language: t3("TL"), sop: t3("TS") }, safetyTip: t3("SAFE"), praise: t3("PUJI") },
      nodes: {
        n1: node([opt("a", 2, 2, 2, "n2"), opt("b", 1, 2, 1, "n2"), opt("c", 0, 1, 0, "n2", true)]),
        n2: node([opt("a", 2, 2, 2, "n3"), opt("b", 1, 2, 1, "n3"), opt("c", 0, 1, 0, "n3", true)]),
        n3: node([opt("a", 2, 2, 2, "n4"), opt("b", 2, 1, 2, "n4"), opt("c", 0, 1, 0, "n4", true), opt("d", 1, 1, 1, "n4")]),
        n4: node([opt("a", 2, 2, 2, "x1"), opt("b", 1, 1, 1, "x1")]),
        x1: { type: "outcome", tone: "good", ending: t3("akhir") }
      }
    };
    var CASES = [
      ["A", ["a", "a", "a", "a"], { d: 100, l: 100, s: 100, g: 100, k: 5, safe: true }],
      ["B", ["b", "a", "b", "a"], { d: 88, l: 88, s: 88, g: 88, k: 4, safe: true }],
      ["C", ["a", "c", "d", "a"], { d: 63, l: 75, s: 63, g: 66, k: 3, safe: false }],
      ["D", ["a", "a", "c", "a"], { d: 75, l: 88, s: 75, g: 78, k: 3, safe: false }]
    ];
    CASES.forEach(function (c) {
      var r = HSL.engine.createRun(sc, "id", "2026-07-26T00:00:00.000Z");
      c[1].forEach(function (o) { r = HSL.engine.applyChoice(sc, r, o); });
      var s = HSL.engine.summarize(sc, r);
      var x = c[2];
      var ok = s.scores.decision === x.d && s.scores.language === x.l && s.scores.sop === x.s &&
        s.scores.combined === x.g && s.keys === x.k && s.safe === x.safe && s.N === 4;
      out.push(res("GOLD-" + c[0], "kasus emas §9.5", ok,
        ok ? "" : JSON.stringify(s.scores) + " keys=" + s.keys + " safe=" + s.safe));
    });
    return out;
  }

  check.runAll = function () {
    var out = [];
    out.push(dictParity());
    out.push(regOrder());
    var data = HSL.data || { scenarios: {}, order: [] };
    var slugs = Array.isArray(data.order) && data.order.length ? data.order : Object.keys(data.scenarios || {});
    slugs.forEach(function (slug) {
      var sc = data.scenarios && data.scenarios[slug];
      if (!sc) return;
      out.push(scFields(slug, sc));
      out.push(scText3(slug, sc));
      out.push(scGraf(slug, sc));
      out.push(scRubrik(slug, sc));
    });
    return out.concat(golds());
  };

  // Daftar kanonik DE untuk pembandingan manual T-04.
  check.canonicalDe = function () {
    var data = HSL.data || { scenarios: {}, order: [] };
    return (data.order || []).map(function (slug) {
      var sc = data.scenarios && data.scenarios[slug];
      return {
        slug: slug,
        titleDe: sc && sc.title ? sc.title.de : "(absen)",
        summaryDe: sc && sc.summary ? sc.summary.de : "(absen)"
      };
    });
  };

  // Bootstrap render — hanya bila halaman check.html yang memuat berkas ini.
  if (typeof document !== "undefined" && document.getElementById("check-out")) {
    var mount = document.getElementById("check-out");
    var results = check.runAll();
    var passCount = results.filter(function (r) { return r.pass; }).length;
    var h = document.createElement("p");
    h.textContent = passCount + "/" + results.length + " PASS" + (passCount === results.length ? " — semua hijau" : " — ADA KEGAGALAN");
    h.className = passCount === results.length ? "check-pass" : "check-fail";
    mount.appendChild(h);
    var table = document.createElement("table");
    table.className = "check-table";
    var thead = document.createElement("thead");
    var trh = document.createElement("tr");
    ["Status", "Id", "Nama", "Detail"].forEach(function (t) {
      var th = document.createElement("th");
      th.textContent = t;
      trh.appendChild(th);
    });
    thead.appendChild(trh);
    table.appendChild(thead);
    var tbody = document.createElement("tbody");
    results.forEach(function (r) {
      var tr = document.createElement("tr");
      [[r.pass ? "PASS" : "FAIL", r.pass ? "check-pass" : "check-fail"], [r.id], [r.name], [r.detail]].forEach(function (cell) {
        var td = document.createElement("td");
        td.textContent = cell[0];
        if (cell[1]) td.className = cell[1];
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    mount.appendChild(table);
    var h2 = document.createElement("h2");
    h2.textContent = "Daftar kanonik DE (pembanding T-04)";
    mount.appendChild(h2);
    var ol = document.createElement("ol");
    check.canonicalDe().forEach(function (row) {
      var li = document.createElement("li");
      li.textContent = row.slug + " — " + row.titleDe + " — " + row.summaryDe;
      ol.appendChild(li);
    });
    mount.appendChild(ol);
  }
})();
