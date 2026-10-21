/* SolveCo homepage concept — progressive enhancement only.
   The page is fully usable (in English) without this script. */
(function () {
  "use strict";

  /* ---------- Language switch (EN / ES) ---------- */
  var DICT = window.SOLVECO_I18N || { en: {}, es: {} };
  var originals = {};              // key -> original English innerHTML
  var current = "en";
  var nodes = document.querySelectorAll("[data-i18n]");
  nodes.forEach(function (el) { originals[el.getAttribute("data-i18n")] = el.innerHTML; });

  function tr(key) {
    if (current !== "en" && DICT[current] && DICT[current][key]) return DICT[current][key];
    if (DICT.en && DICT.en[key]) return DICT.en[key];
    return originals[key] || "";
  }

  function setLang(lang, persist) {
    current = (lang === "es") ? "es" : "en";
    nodes.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var html = current === "en" ? originals[key] : (DICT.es[key] || originals[key]);
      if (el.innerHTML !== html) el.innerHTML = html;
    });
    document.documentElement.lang = current === "es" ? "es" : "en-ZA";
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === current));
    });
    if (persist) { try { localStorage.setItem("solveco-lang", current); } catch (e) { /* storage unavailable */ } }
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang"), true); });
  });
  try {
    var saved = localStorage.getItem("solveco-lang");
    if (saved === "es") setLang("es", false);
  } catch (e) { /* ignore */ }

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  var mq = window.matchMedia("(max-width: 899px)");

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    var label = toggle.querySelector(".label");
    if (label) label.textContent = open ? tr("nav.close") : tr("nav.menu2");
  }
  function isOpen() { return toggle.getAttribute("aria-expanded") === "true"; }

  if (toggle && nav) {
    toggle.addEventListener("click", function () { setOpen(!isOpen()); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) { setOpen(false); toggle.focus(); }
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && mq.matches) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || !isOpen() || !mq.matches) return;
      var focusables = [toggle].concat(Array.prototype.slice.call(nav.querySelectorAll("a")));
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    var onChange = function () { if (!mq.matches && isOpen()) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener("change", onChange); else mq.addListener(onChange);
  }

  /* ---------- Prototype enquiry form (non-submitting) ---------- */
  var form = document.getElementById("enquiry-form");
  if (form) {
    var status = document.getElementById("form-status");
    var fields = [
      { id: "f-name",  err: "err.name" },
      { id: "f-email", err: "err.email", email: true },
      { id: "f-org",   err: "err.org" },
      { id: "f-msg",   err: "err.msg", min: 20 }
    ];
    function validate(f) {
      var el = document.getElementById(f.id);
      var wrap = el.closest(".field");
      var err = document.getElementById(f.id + "-error");
      var v = el.value.trim();
      var bad = !v || (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) || (f.min && v.length < f.min);
      wrap.setAttribute("data-invalid", bad ? "true" : "false");
      el.setAttribute("aria-invalid", bad ? "true" : "false");
      err.textContent = bad ? tr(f.err) : "";
      return !bad;
    }
    fields.forEach(function (f) {
      var el = document.getElementById(f.id);
      el.addEventListener("blur", function () { if (el.value.trim()) validate(f); });
      el.addEventListener("input", function () {
        if (el.closest(".field").getAttribute("data-invalid") === "true") validate(f);
      });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Prototype: nothing is transmitted anywhere.
      var firstInvalid = null;
      fields.forEach(function (f) {
        var ok = validate(f);
        if (!ok && !firstInvalid) firstInvalid = document.getElementById(f.id);
      });
      if (firstInvalid) {
        status.setAttribute("data-tone", "error");
        status.textContent = tr("err.fix");
        firstInvalid.focus();
        return;
      }
      status.setAttribute("data-tone", "ok");
      status.innerHTML = tr("ok.status");
    });
  }

  /* ---------- Entrance reveals (IntersectionObserver) ---------- */
  var reveals = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduce) {
    document.documentElement.classList.add("no-io");
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
