(function () {
  "use strict";
  window.HSL = window.HSL || {};
  var S, I, U;

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

  // Dengan JS: hanya blok bahasa aktif yang tampil; tanpa preferensi: ketiganya tampil (§5.4).
  function updateSections() {
    var sections = document.querySelectorAll("section.info-lang");
    var active = hasLang() ? S.state.settings.lang : null;
    for (var i = 0; i < sections.length; i++) {
      if (active && sections[i].getAttribute("lang") !== active) {
        sections[i].setAttribute("hidden", "");
      } else {
        sections[i].removeAttribute("hidden");
      }
    }
  }

  // Hapus semua data — konfirmasi dua langkah sebaris dengan fokus terkelola (§5.4.4).
  function renderDeleteWidget(slot) {
    U.clear(slot);
    var trigger = U.el("button", { type: "button", "class": "btn btn--danger" }, I.t("ui.info.deleteBtn"));
    trigger.addEventListener("click", function () {
      U.clear(slot);
      var panel = U.el("div", { "class": "confirm-panel" });
      var ask = U.el("p", null, I.t("ui.info.deleteAsk"));
      panel.appendChild(ask);
      var row = U.el("div", { "class": "btn-row" });
      var yes = U.el("button", { type: "button", "class": "btn btn--danger" }, I.t("ui.info.deleteYes"));
      yes.addEventListener("click", function () {
        S.resetAll();
        U.applyMotionClass();
        I.applyDocument();
        U.applyI18n(document);
        updateSections();
        renderAllWidgets();
        U.showBanner({ kind: "success", text: I.t("ui.info.deleted") });
      });
      var no = U.el("button", { type: "button", "class": "btn" }, I.t("ui.info.deleteNo"));
      no.addEventListener("click", function () {
        renderDeleteWidget(slot);
        var btn = slot.querySelector("button");
        if (btn) btn.focus();
      });
      row.appendChild(yes);
      row.appendChild(no);
      panel.appendChild(row);
      slot.appendChild(panel);
      U.focusHeading(ask);
    });
    slot.appendChild(trigger);
  }

  // Pengaturan gerak §11.6: auto / reduce / full; berlaku seketika.
  function renderMotionWidget(slot, groupSuffix) {
    U.clear(slot);
    var fs = U.el("fieldset", { "class": "motion-fieldset" });
    fs.appendChild(U.el("legend", null, I.t("ui.info.motionLegend")));
    var current = (S.state.settings && S.state.settings.motion) || "auto";
    ["auto", "reduce", "full"].forEach(function (val) {
      var id = "motion-" + groupSuffix + "-" + val;
      var input = U.el("input", {
        type: "radio", name: "motion-" + groupSuffix, id: id, value: val,
        checked: current === val ? true : null
      });
      input.addEventListener("change", function () {
        S.save(function (st) { st.settings.motion = val; });
        U.applyMotionClass();
        syncMotionRadios(val);
      });
      var label = U.el("label", { "for": id });
      label.appendChild(input);
      label.appendChild(document.createTextNode(" " + I.t("ui.info.motion." + val)));
      fs.appendChild(label);
    });
    slot.appendChild(fs);
  }

  function syncMotionRadios(val) {
    var inputs = document.querySelectorAll(".motion-fieldset input[type=radio]");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = inputs[i].getAttribute("value") === val;
    }
  }

  function renderAllWidgets() {
    var delSlots = document.querySelectorAll("[data-delete-slot]");
    for (var i = 0; i < delSlots.length; i++) renderDeleteWidget(delSlots[i]);
    var motSlots = document.querySelectorAll("[data-motion-slot]");
    for (var j = 0; j < motSlots.length; j++) renderMotionWidget(motSlots[j], String(j));
  }

  function boot() {
    S = HSL.store; I = HSL.i18n; U = HSL.ui;
    S.load();
    U.applyMotionClass();
    I.applyDocument();
    U.applyI18n(document);
    U.langSwitcher(document.getElementById("lang-switch-slot"));
    showStoreNotices();
    updateSections();
    renderAllWidgets();
    I.onLangChange = function () {
      U.applyI18n(document);
      updateSections();
      renderAllWidgets();
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
