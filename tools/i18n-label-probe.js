// Uji label kategori: muat registry.js + ketiga i18n, cetak label per kategori.
// Jalankan: node i18n-label-probe.js <path-proyek>
"use strict";
var fs = require("fs"), path = require("path"), vm = require("vm");

var root = process.argv[2];
if (!root) { console.error("usage: node i18n-label-probe.js <project-dir>"); process.exit(2); }

function loadGlobal(rel) {
  var code = fs.readFileSync(path.join(root, rel), "utf8");
  // Sama seperti browser: window adalah global object itu sendiri,
  // sehingga `window.HSL = ...` juga membuat `HSL` tersedia tanpa prefix.
  var ctx = vm.createContext({ console: console });
  vm.runInContext("var window = this;", ctx, { filename: rel });
  vm.runInContext(code, ctx, { filename: rel });
  return ctx;
}

// registry -> categories + order
var reg = loadGlobal("data/registry.js");
var cats = reg.window.HSL.data.categories;
var order = reg.window.HSL.data.order;

// i18n tiap bahasa
var LANGS = ["de", "en", "id"];
var dicts = {};
LANGS.forEach(function (l) {
  var ctx = loadGlobal(path.join("i18n", l + ".js"));
  dicts[l] = ctx.window.HSL.i18n.dict[l];
});

var missing = [];
var rows = cats.map(function (c) {
  var key = "ui.home.cat." + c;
  var row = { cat: c };
  LANGS.forEach(function (l) {
    var v = dicts[l][key];
    // I.t mengembalikan kunci mentah saat key tidak ada -> itu cacat UI
    if (typeof v !== "string" || !v.trim() || v.indexOf("ui.home.") === 0) {
      missing.push(l + ":" + key);
      row[l] = "<HILANG>";
    } else {
      row[l] = v;
    }
  });
  return row;
});

console.log("kategorI dlm registry: " + cats.length);
console.log("slgn dlm order       : " + order.length);
console.log("");
console.log(pad("category", 14) + pad("de", 22) + pad("en", 22) + "id");
console.log("-".repeat(74));
rows.forEach(function (r) {
  console.log(pad(r.cat, 14) + pad(r.de, 22) + pad(r.en, 22) + r.id);
});

// skenario punya kategori valid?
var badCat = order.filter(function (s) {
  return cats.indexOf(loadScenario(s)) < 0;
});
function loadScenario(slug) {
  var ctx = loadGlobal(path.join("data", "scenarios", slug + ".js"));
  return ctx.window.HSL.data.scenarios[slug].category;
}
console.log("");
console.log("skrp dgn kategori asing: " + (badCat.length ? badCat.join(", ") : "tidak ada"));
console.log("label kategori hilang  : " + (missing.length ? missing.join(", ") : "tidak ada"));

function pad(s, n) { s = String(s); while (s.length < n) s += " "; return s; }

process.exit(missing.length || badCat.length ? 1 : 0);
