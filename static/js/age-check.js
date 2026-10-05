(function () {
  var AGE_KEY = "tf_age_ok";
  var COOKIE_KEY = "tf_cookie_ok";
  var DENY = "access-denied.html";

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function ageOk() {
    try {
      if (localStorage.getItem(AGE_KEY) === "1") return true;
    } catch (e) {}
    return /(?:^|; )tf_age=1(?:;|$)/.test(document.cookie);
  }

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function setupAge() {
    var gate = qs("[data-tf-age]");
    if (!gate) return;

    if (ageOk()) {
      gate.hidden = true;
      gate.style.display = "none";
      document.documentElement.classList.add("age-ok");
      document.documentElement.classList.remove("age-pending");
      document.body.style.overflow = "";
      setupCookie();
      return;
    }

    gate.hidden = false;
    gate.style.display = "";
    document.documentElement.classList.add("age-pending");
    document.documentElement.classList.remove("age-ok");
    document.body.style.overflow = "hidden";

    var yes = qs("[data-tf-age-yes]", gate);
    var no = qs("[data-tf-age-no]", gate);

    if (yes) {
      yes.addEventListener("click", function () {
        try {
          localStorage.setItem(AGE_KEY, "1");
        } catch (e) {}
        document.cookie = "tf_age=1;path=/;max-age=31536000;SameSite=Lax";
        gate.hidden = true;
        gate.style.display = "none";
        document.documentElement.classList.add("age-ok");
        document.documentElement.classList.remove("age-pending");
        document.body.style.overflow = "";
        setupCookie();
      });
    }

    if (no) {
      no.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = DENY;
      });
    }
  }

  function setupCookie() {
    var banner = qs("[data-tf-cookie]");
    if (!banner) return;
    try {
      if (localStorage.getItem(COOKIE_KEY) === "1") {
        banner.hidden = true;
        return;
      }
    } catch (e) {}
    banner.hidden = false;
    var accept = qs("[data-tf-cookie-accept]", banner);
    if (accept) {
      accept.addEventListener("click", function () {
        try {
          localStorage.setItem(COOKIE_KEY, "1");
        } catch (e) {}
        banner.hidden = true;
      });
    }
  }

  function setupBurger() {
    var burger = qs("[data-tf-burger]");
    var side = qs("[data-tf-side]");
    var backdrop = qs("[data-tf-backdrop]");
    if (!burger || !side) return;

    function close() {
      burger.classList.remove("is-open");
      side.classList.remove("is-open");
      document.body.classList.remove("tf-nav-open");
      if (backdrop) backdrop.classList.remove("is-on");
      burger.setAttribute("aria-expanded", "false");
    }

    function open() {
      burger.classList.add("is-open");
      side.classList.add("is-open");
      document.body.classList.add("tf-nav-open");
      if (backdrop) backdrop.classList.add("is-on");
      burger.setAttribute("aria-expanded", "true");
    }

    burger.addEventListener("click", function () {
      if (side.classList.contains("is-open")) close();
      else open();
    });

    if (backdrop) backdrop.addEventListener("click", close);

    side.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
    });
  }

  if (ageOk()) {
    document.documentElement.classList.add("age-ok");
    document.documentElement.classList.remove("age-pending");
  }

  ready(function () {
    setupAge();
    setupBurger();
  });
})();
