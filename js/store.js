(function () {
  "use strict";
  window.HSL = window.HSL || {};
  HSL.APP_VERSION = "1.0.0";

  var KEY = "hsl.v1";
  var KEY_CORRUPT = "hsl.v1.corrupt";

  // Larik migrasi §7.5 — kosong di v1; v2 tinggal mengisi fungsi (state) => state.
  var migrations = [];

  var store = {
    mode: "persistent",
    notices: [],
    state: null,

    defaultState: function (nowIso) {
      return {
        schemaVersion: 1,
        app: { version: HSL.APP_VERSION, createdAt: nowIso, updatedAt: nowIso },
        settings: { motion: "auto" },
        progress: {}
      };
    },

    load: function () {
      if (this.state) return this.state;
      var raw = null;
      try { raw = localStorage.getItem(KEY); }
      catch (e) { this.mode = "memory"; this.pushNotice("storage-unavailable"); }
      if (this.mode === "persistent" && raw !== null) {
        var parsed = null;
        try { parsed = JSON.parse(raw); } catch (e) { parsed = null; }
        if (!parsed || typeof parsed !== "object" || typeof parsed.schemaVersion !== "number" ||
            !parsed.settings || typeof parsed.settings !== "object") {
          try { localStorage.setItem(KEY_CORRUPT, raw); } catch (e) {}
          this.pushNotice("corrupt-recovered");
          raw = null;
        } else if (parsed.schemaVersion > 1) {
          this.mode = "memory";
          this.pushNotice("newer-schema");
          raw = null;
        } else {
          this.state = this.runMigrations(parsed);
        }
      }
      if (!this.state) this.state = this.defaultState(new Date().toISOString());
      return this.state;
    },

    runMigrations: function (parsed) {
      while (typeof parsed.schemaVersion === "number" && parsed.schemaVersion < 1 + migrations.length) {
        parsed = migrations[parsed.schemaVersion - 1](parsed);
        parsed.schemaVersion += 1;
      }
      // Jaring pengaman baca (§2.1): bentuk minimum dijamin.
      if (!parsed.app || typeof parsed.app !== "object") {
        var now = new Date().toISOString();
        parsed.app = { version: HSL.APP_VERSION, createdAt: now, updatedAt: now };
      }
      if (!parsed.progress || typeof parsed.progress !== "object") parsed.progress = {};
      if (typeof parsed.settings.motion !== "string") parsed.settings.motion = "auto";
      var ar = parsed.activeRun;
      if (ar !== undefined) {
        if (!ar || typeof ar !== "object" || typeof ar.scenarioId !== "string") {
          delete parsed.activeRun;
        } else if (Array.isArray(ar.steps)) {
          ar.steps = ar.steps.slice(0, 5);
        } else {
          ar.steps = [];
        }
      }
      return parsed;
    },

    pushNotice: function (name) {
      if (this.notices.indexOf(name) < 0) this.notices.push(name);
    },

    // save(mutator): mutator(state) sinkron; tulis-tembus blob utuh; tak pernah melempar.
    save: function (mutator) {
      var st = this.load();
      try {
        if (typeof mutator === "function") mutator(st);
        st.app.updatedAt = new Date().toISOString();
        if (this.mode === "memory") return;
        var json = JSON.stringify(st);
        try { localStorage.setItem(KEY, json); return; } catch (e1) {}
        // Kuota penuh (§12 baris 5): buang salinan penyelamatan, coba ulang sekali.
        try { localStorage.removeItem(KEY_CORRUPT); } catch (e2) {}
        try { localStorage.setItem(KEY, json); return; } catch (e3) {}
        this.mode = "memory";
        this.pushNotice("storage-unavailable");
      } catch (e) {
        this.pushNotice("storage-unavailable");
      }
    },

    // Aturan pembaruan progres §7.3 — dipanggil di dalam mutator save saat run selesai.
    recordResult: function (scenarioId, result, nowIso) {
      var st = this.load();
      var p = st.progress[scenarioId];
      if (!p) p = st.progress[scenarioId] = { attempts: 0, completed: false, best: null, last: null };
      var r = {
        combined: result.combined,
        decision: result.decision,
        language: result.language,
        sop: result.sop,
        keys: result.keys,
        safe: result.safe,
        at: result.at || nowIso
      };
      p.attempts += 1;
      p.completed = true;
      p.last = r;
      if (!p.best || r.combined > p.best.combined ||
          (r.combined === p.best.combined && r.safe && !p.best.safe)) {
        p.best = r;
      }
    },

    resetAll: function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      try { localStorage.removeItem(KEY_CORRUPT); } catch (e) {}
      this.state = this.defaultState(new Date().toISOString());
      this.notices = [];
    }
  };

  window.HSL.store = store;
})();
