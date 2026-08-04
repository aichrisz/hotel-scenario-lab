(function () {
  "use strict";
  window.HSL = window.HSL || {};
  var SVG_NS = "http://www.w3.org/2000/svg";

  // Pembuatan DOM aman: seluruh string anak menjadi text node — tanpa markup.
  function appendKids(node, children) {
    if (children === null || children === undefined || children === false) return;
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) appendKids(node, children[i]);
      return;
    }
    if (typeof children === "string" || typeof children === "number") {
      node.appendChild(document.createTextNode(String(children)));
    } else {
      node.appendChild(children);
    }
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) continue;
        var v = attrs[k];
        if (v === null || v === undefined || v === false) continue;
        if (k === "class") node.className = String(v);
        else node.setAttribute(k, v === true ? "" : String(v));
      }
    }
    appendKids(node, children);
    return node;
  }

  function clear(node) {
    while (node && node.firstChild) node.removeChild(node.firstChild);
  }

  function svgEl(tag, attrs) {
    var node = document.createElementNS(SVG_NS, tag);
    for (var k in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, k)) node.setAttribute(k, String(attrs[k]));
    }
    return node;
  }

  var ICON_PATHS = {
    info: "M12 8h.01M12 11v5M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z",
    warn: "M12 9v4M12 17h.01M10.3 3.8 2.6 17.2a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z",
    danger: "M12 8v5M12 16.5h.01M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z",
    success: "M8 12.5l3 3 5-6M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"
  };

  function icon(kind) {
    var svg = svgEl("svg", {
      viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", "class": "icon"
    });
    svg.appendChild(svgEl("path", {
      d: ICON_PATHS[kind] || ICON_PATHS.info,
      fill: "none", stroke: "currentColor", "stroke-width": "1.75",
      "stroke-linecap": "round", "stroke-linejoin": "round"
    }));
    return svg;
  }

  function keyIcon(filled) {
    var svg = svgEl("svg", {
      viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false",
      "class": "icon icon-key" + (filled ? " is-filled" : "")
    });
    svg.appendChild(svgEl("circle", {
      cx: "8.5", cy: "12", r: "3.75",
      fill: filled ? "currentColor" : "none", stroke: "currentColor", "stroke-width": "1.75"
    }));
    svg.appendChild(svgEl("path", {
      d: "M12.25 12h9M18 12v3.5M21.25 12v2.5",
      fill: "none", stroke: "currentColor", "stroke-width": "1.75", "stroke-linecap": "round"
    }));
    return svg;
  }

  function banner(opts) {
    var kind = opts.kind || "info";
    var box = el("div", { "class": "banner banner--" + kind });
    box.appendChild(icon(kind));
    var body = el("div", { "class": "banner__body" });
    var lines = String(opts.text).split("\n\n");
    for (var i = 0; i < lines.length; i++) body.appendChild(el("p", { "class": "banner__text" }, lines[i]));
    if (opts.action) {
      var act = el("button", { type: "button", "class": "btn banner__action" }, opts.action.label);
      act.addEventListener("click", opts.action.onClick);
      body.appendChild(act);
    }
    box.appendChild(body);
    if (opts.dismissible !== false) {
      var x = el("button", {
        type: "button", "class": "banner__close",
        "aria-label": HSL.i18n && HSL.i18n.t ? HSL.i18n.t("ui.banner.close") : "Tutup"
      }, "×");
      x.addEventListener("click", function () { if (box.parentNode) box.parentNode.removeChild(box); });
      box.appendChild(x);
    }
    return box;
  }

  function showBanner(opts) {
    var c = document.getElementById("banners");
    if (!c) return null;
    var b = banner(opts);
    c.appendChild(b);
    return b;
  }

  function motionMode() {
    var st = HSL.store && HSL.store.state;
    var m = st && st.settings ? st.settings.motion : "auto";
    if (m === "reduce" || m === "full") return m;
    var prefers = typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return prefers ? "reduce" : "full";
  }

  function applyMotionClass() {
    var root = document.documentElement;
    var mode = motionMode();
    root.classList.remove("motion-reduce", "motion-full");
    root.classList.add(mode === "reduce" ? "motion-reduce" : "motion-full");
  }

  function focusHeading(elm) {
    if (!elm) return;
    elm.setAttribute("tabindex", "-1");
    try { elm.focus({ preventScroll: true }); } catch (e) { elm.focus(); }
    try {
      elm.scrollIntoView({ behavior: motionMode() === "full" ? "smooth" : "auto", block: "nearest" });
    } catch (e2) {}
  }

  function scoreBar(labelText, pct) {
    var wrap = el("div", { "class": "score-bar" });
    wrap.appendChild(el("span", { "class": "score-bar__label" }, labelText));
    var track = el("div", { "class": "score-bar__track", "aria-hidden": "true" });
    var fill = el("div", { "class": "score-bar__fill" });
    track.appendChild(fill);
    wrap.appendChild(track);
    // Lebar diset via properti style dari JS (bukan atribut markup) — kontrak §2.4.
    fill.style.width = "0%";
    var raf = typeof window.requestAnimationFrame === "function" ? window.requestAnimationFrame : function (f) { f(); };
    raf(function () { raf(function () { fill.style.width = pct + "%"; }); });
    return wrap;
  }

  function keysRow(keys, safe, srText) {
    var wrap = el("div", { "class": "keys-row" });
    var icons = el("span", { "class": "keys-row__icons", "aria-hidden": "true" });
    for (var i = 1; i <= 5; i++) {
      var ic = keyIcon(i <= keys);
      ic.style.animationDelay = ((i - 1) * 60) + "ms";
      icons.appendChild(ic);
    }
    wrap.appendChild(icons);
    wrap.appendChild(el("span", { "class": "keys-row__count", "aria-hidden": srText ? "true" : null }, keys + "/5"));
    if (srText) wrap.appendChild(el("span", { "class": "visually-hidden" }, srText));
    if (!safe) {
      var flag = el("span", { "class": "safety-flag" });
      flag.appendChild(icon("warn"));
      flag.appendChild(el("span", null, HSL.i18n.t("ui.home.safetyFlag")));
      wrap.appendChild(flag);
    }
    return wrap;
  }

  function chip(text, href) {
    return el("a", { "class": "chip", href: href }, text);
  }

  function cardShell(href) {
    return el("a", { "class": "card", href: href });
  }

  function applyI18n(root) {
    var scope = root || document;
    var nodes = scope.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = HSL.i18n.t(nodes[i].getAttribute("data-i18n"));
    }
  }

  var LANG_NAMES = { de: "Deutsch", en: "English", id: "Bahasa Indonesia" };

  function langSwitcher(container, onPick) {
    if (!container) return null;
    var group = el("div", { "class": "lang-switch", role: "group", "aria-label": HSL.i18n.t("ui.lang.label") });
    var buttons = [];
    ["de", "en", "id"].forEach(function (code) {
      var b = el("button", {
        type: "button", "class": "lang-switch__btn", lang: code,
        "aria-label": LANG_NAMES[code],
        "aria-pressed": String(HSL.i18n.lang() === code)
      }, code.toUpperCase());
      b.addEventListener("click", function () {
        HSL.i18n.setLang(code);
        buttons.forEach(function (btn) {
          btn.setAttribute("aria-pressed", String(btn.getAttribute("lang") === code));
        });
        group.setAttribute("aria-label", HSL.i18n.t("ui.lang.label"));
        if (onPick) onPick(code);
      });
      buttons.push(b);
      group.appendChild(b);
    });
    clear(container);
    container.appendChild(group);
    return group;
  }

  window.HSL.ui = {
    el: el,
    clear: clear,
    icon: icon,
    keyIcon: keyIcon,
    banner: banner,
    showBanner: showBanner,
    focusHeading: focusHeading,
    motionMode: motionMode,
    applyMotionClass: applyMotionClass,
    scoreBar: scoreBar,
    keysRow: keysRow,
    chip: chip,
    cardShell: cardShell,
    applyI18n: applyI18n,
    langSwitcher: langSwitcher
  };
})();
