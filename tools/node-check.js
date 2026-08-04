"use strict";

var fs = require("fs");
var path = require("path");
var vm = require("vm");
var root = path.resolve(__dirname, "..");
var args = process.argv.slice(2);
var legacy = args.indexOf("--legacy") >= 0;
var json = args.indexOf("--json") >= 0;
var previewArg = args.filter(function (a) { return a.indexOf("--preview=") === 0; })[0];
var window = {};
window.window = window;
window.HSL = {};
var context = {
  window: window,
  HSL: window.HSL,
  console: console,
  Math: Math,
  Intl: Intl,
  JSON: JSON,
  Object: Object,
  Array: Array,
  Number: Number,
  String: String,
  Boolean: Boolean,
  RegExp: RegExp,
  Date: Date,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout
};
vm.createContext(context);
function load(file) {
  var source = fs.readFileSync(path.join(root, file), "utf8");
  vm.runInContext(source, context, { filename: file });
}
["i18n/de.js", "i18n/en.js", "i18n/id.js", "data/registry.js"].forEach(load);
fs.readdirSync(path.join(root, "data/scenarios")).filter(function (f) { return /\.js$/.test(f); }).sort().forEach(function (f) {
  load("data/scenarios/" + f);
});
load("js/engine.js");
load("tools/check.js");
if (previewArg) {
  var values = previewArg.slice("--preview=".length).split(",").filter(Boolean);
  values.forEach(function (slug) { window.HSL.data.order.push(slug); });
}
var results = window.HSL.check.runAll();
var passed = results.filter(function (r) { return r.pass; }).length;
if (json) {
  process.stdout.write(JSON.stringify({ passed: passed, total: results.length, results: results }) + "\n");
} else {
  process.stdout.write(passed + "/" + results.length + " PASS\n");
  results.filter(function (r) { return !r.pass; }).forEach(function (r) {
    process.stdout.write(r.id + ": " + r.detail + "\n");
  });
  if (legacy) {
    var old = ["DICT-PARITY", "REG-ORDER"];
    ["sc-01-checkin-standard", "sc-02-checkin-no-reservation", "sc-03-checkin-language-barrier", "sc-04-complaint-noise", "sc-05-complaint-billing", "sc-06-complaint-review-threat", "sc-07-upsell-arrival", "sc-08-upsell-services", "sc-09-checkout-rush", "sc-10-checkout-minibar-dispute", "sc-11-privacy-caller", "sc-12-escalation-collapse"].forEach(function (s) {
      ["SC-FIELDS-", "SC-TEXT3-", "SC-GRAF-", "SC-RUBRIK-"].forEach(function (p) { old.push(p + s); });
    });
    ["GOLD-A", "GOLD-B", "GOLD-C", "GOLD-D"].forEach(function (id) { old.push(id); });
    var map = {};
    results.forEach(function (r) { map[r.id] = r; });
    var missing = old.filter(function (id) { return !map[id]; });
    var bad = old.filter(function (id) { return !map[id] || !map[id].pass; });
    old.forEach(function (id) { process.stdout.write("LEGACY " + id + ": " + (map[id] && map[id].pass ? "PASS" : "FAIL") + "\n"); });
    process.stdout.write("LEGACY " + (old.length - bad.length) + "/" + old.length + " PASS\n");
    if (missing.length) process.stdout.write("LEGACY-MISSING: " + missing.join(",") + "\n");
    if (bad.length) process.stdout.write("LEGACY-FAIL: " + bad.join(",") + "\n");
    if (bad.length) process.exitCode = 1;
  }
}
if (passed !== results.length) process.exitCode = 1;
