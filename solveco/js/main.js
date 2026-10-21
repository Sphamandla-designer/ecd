/* SolveCo homepage concept — progressive enhancement only.
   The page is fully usable without this script. */
(function () {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  var mq = window.matchMedia("(max-width: 899px)");

  function setOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    var label = toggle.querySelector(".label");
    if (label) label.textContent = open ? "Close" : "Menu";
  }
  function isOpen() { return toggle.getAttribute("aria-expanded") === "true"; }

  if (toggle && nav) {
    toggle.addEventListener("click", function () { setOpen(!isOpen()); });

    // Close on Escape and return focus to the toggle.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) { setOpen(false); toggle.focus(); }
    });

    // Close after choosing a link so the anchor target is visible.
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && mq.matches) setOpen(false);
    });

    // Keep focus inside the open menu (toggle + links) on small screens.
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || !isOpen() || !mq.matches) return;
      var focusables = [toggle].concat(Array.prototype.slice.call(nav.querySelectorAll("a")));
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    // Reset state if the viewport grows past the mobile breakpoint.
    var onChange = function () { if (!mq.matches && isOpen()) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener("change", onChange); else mq.addListener(onChange);
  }

  /* ---------- Prototype enquiry form (non-submitting) ---------- */
  var form = document.getElementById("enquiry-form");
  if (form) {
    var status = document.getElementById("form-status");
    var fields = [
      { id: "f-name",  label: "your full name" },
      { id: "f-email", label: "a valid business email address", email: true },
      { id: "f-org",   label: "your organisation" },
      { id: "f-msg",   label: "a short description of your enquiry (at least 20 characters)", min: 20 }
    ];

    function validate(f) {
      var el = document.getElementById(f.id);
      var wrap = el.closest(".field");
      var err = document.getElementById(f.id + "-error");
      var v = el.value.trim();
      var msg = "";
      if (!v) msg = "Please enter " + f.label + ".";
      else if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = "Please enter " + f.label + ".";
      else if (f.min && v.length < f.min) msg = "Please enter " + f.label + ".";
      wrap.setAttribute("data-invalid", msg ? "true" : "false");
      el.setAttribute("aria-invalid", msg ? "true" : "false");
      err.textContent = msg;
      return !msg;
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
        status.textContent = "Please correct the highlighted fields.";
        firstInvalid.focus();
        return;
      }
      status.setAttribute("data-tone", "ok");
      status.innerHTML = "Your details are complete. This prototype does not send enquiries, so nothing has been submitted to SolveCo. " +
        "To make a real enquiry, call <a href=\"tel:+27109000693\">+27 10 900 0693</a> or visit " +
        "<a href=\"https://www.solveco.co.za/\" target=\"_blank\" rel=\"noopener\">solveco.co.za<span class=\"visually-hidden\"> (opens in a new tab)</span></a>.";
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
