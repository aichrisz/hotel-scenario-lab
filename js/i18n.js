(function () {
  "use strict";
  window.HSL = window.HSL || {};
  var i18n = (HSL.i18n = HSL.i18n || { dict: {} });
  var CODES = ["de", "en", "id"];
  var LOCALES = { de: "de-DE", en: "en-GB", id: "id-ID" };

  i18n.onLangChange = null;

  i18n.lang = function () {
    var st = HSL.store && HSL.store.state;
    var l = st && st.settings ? st.settings.lang : null;
    return CODES.indexOf(l) >= 0 ? l : "de";
  };

  // Rantai cadangan §10.5.3: aktif → de → en → id.
  function chain() {
    var active = i18n.lang();
    var c = [active];
    ["de", "en", "id"].forEach(function (k) { if (k !== active) c.push(k); });
    return c;
  }

  i18n.t = function (key, params) {
    var s = null, c = chain();
    for (var k = 0; k < c.length; k++) {
      var d = i18n.dict[c[k]];
      if (d && typeof d[key] === "string" && d[key]) { s = d[key]; break; }
    }
    if (s === null) return key;
    return s.replace(/\{(\w+)\}/g, function (m, name) {
      return params && Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : m;
    });
  };

  i18n.text = function (text3) {
    if (!text3 || typeof text3 !== "object") return "";
    var c = chain();
    for (var k = 0; k < c.length; k++) {
      var v = text3[c[k]];
      if (typeof v === "string" && v) return v;
    }
    return "";
  };

  // Perbarui atribut lang dokumen + judul; aman dipanggil tanpa DOM (Node).
  i18n.applyDocument = function () {
    if (typeof document === "undefined") return;
    document.documentElement.lang = i18n.lang();
    document.title = i18n.t("ui.nav.appName") + " — " + i18n.t("ui.nav.subtitle");
  };

  i18n.setLang = function (code) {
    if (CODES.indexOf(code) < 0) return;
    HSL.store.save(function (s) { s.settings.lang = code; });
    i18n.applyDocument();
    if (typeof i18n.onLangChange === "function") i18n.onLangChange();
  };

  i18n.fmtDateTime = function (iso) {
    try {
      return new Intl.DateTimeFormat(LOCALES[i18n.lang()], { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
    } catch (e) {
      return String(iso);
    }
  };
})();
