(function () {
  var root = document.documentElement;
  root.classList.add("js");
  var calme = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Langue, mémorisée d'une page à l'autre */
  function setLangue(l) {
    root.setAttribute("data-lang", l); root.lang = l;
    try { localStorage.setItem("gj-lang", l); } catch (e) {}
  }
  var btnL = document.getElementById("langue");
  if (btnL) btnL.addEventListener("click", function () {
    setLangue(root.getAttribute("data-lang") === "fr" ? "en" : "fr");
  });

  /* Menu mobile */
  var menu = document.getElementById("menu"), burger = document.getElementById("burger");
  if (burger) burger.addEventListener("click", function () {
    var o = menu.classList.toggle("ouvert"); burger.setAttribute("aria-expanded", o);
  });

  /* Ombre de l'en-tête au défilement */
  var top = document.querySelector(".top");
  function ombre() { if (top) top.classList.toggle("defile", scrollY > 8); }
  addEventListener("scroll", ombre, { passive: true }); ombre();

  /* Lettres du grand titre */
  document.querySelectorAll("[data-lettres]").forEach(function (el) {
    var t = el.textContent, i = 0; el.textContent = "";
    el.setAttribute("aria-label", t);
    t.split("").forEach(function (c) {
      var s = document.createElement("span");
      s.className = "lettre"; s.setAttribute("aria-hidden", "true");
      s.style.setProperty("--i", i++); s.textContent = c === " " ? " " : c;
      el.appendChild(s);
    });
  });

  /* Rôles qui tournent */
  var tourne = document.querySelectorAll(".tourne");
  if (tourne.length && !calme) {
    var k = 0;
    setInterval(function () {
      tourne.forEach(function (el) {
        var mots = (el.getAttribute("data-mots") || "").split("|");
        el.classList.add("change");
        setTimeout(function () { el.textContent = mots[(k + 1) % mots.length]; el.classList.remove("change"); }, 350);
      });
      k++;
    }, 2600);
  }

  /* Apparitions : seuls les éléments sous la ligne de flottaison attendent */
  var rev = [].slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && !calme) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.remove("attente"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    rev.forEach(function (el) {
      if (el.getBoundingClientRect().top > innerHeight) { el.classList.add("attente"); io.observe(el); }
    });
  }

  /* Compteurs */
  var cpt = document.querySelectorAll("[data-compte]");
  if ("IntersectionObserver" in window && !calme) {
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, fin = +el.getAttribute("data-compte"), t0 = null;
        function pas(t) {
          if (!t0) t0 = t;
          var p = Math.min((t - t0) / 1400, 1), v = Math.round(fin * (1 - Math.pow(1 - p, 3)));
          el.textContent = v; if (p < 1) requestAnimationFrame(pas);
        }
        requestAnimationFrame(pas); io2.unobserve(el);
      });
    }, { threshold: .6 });
    cpt.forEach(function (el) { io2.observe(el); });
  }

  /* Orientation : vous êtes... */
  var choix = document.querySelectorAll(".choix button");
  choix.forEach(function (b) {
    b.addEventListener("click", function () {
      choix.forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      document.querySelectorAll(".reponse [data-pour]").forEach(function (c) {
        c.hidden = c.getAttribute("data-pour") !== b.getAttribute("data-cle");
      });
    });
  });

  /* Frise qui se remplit */
  var frise = document.querySelector(".frise"), jauge = frise && frise.querySelector(".jauge");
  if (jauge && !calme) {
    function remplir() {
      var r = frise.getBoundingClientRect(), vu = innerHeight * .7 - r.top;
      jauge.style.setProperty("--h", Math.max(0, Math.min(r.height, vu)) + "px");
    }
    addEventListener("scroll", remplir, { passive: true }); remplir();
  }

  /* Copier l'adresse */
  var cp = document.getElementById("copier"), toast = document.getElementById("toast");
  if (cp) cp.addEventListener("click", function (ev) {
    ev.preventDefault();
    var mail = document.getElementById("mail");
    function ok() { if (!toast) return; toast.classList.add("vu"); setTimeout(function () { toast.classList.remove("vu"); }, 2200); }
    function repli() { var r = document.createRange(); r.selectNodeContents(mail); var s = getSelection(); s.removeAllRanges(); s.addRange(r); }
    try { navigator.clipboard.writeText(mail.textContent.trim()).then(ok, repli); } catch (e) { repli(); }
  });
})();
