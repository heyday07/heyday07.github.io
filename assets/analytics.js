// Site visit statistics (Google Analytics 4, property "RedMoon Lab Website").
// Loaded on every page. Records page views plus two events:
//   store_click  — a Google Play / App Store button: which app, which store, page language
//   lang_switch  — the KO/EN/JP switch
// No ad features. Visitors in the EEA, the UK and Switzerland get analytics cookies off by
// default (Consent Mode sends cookieless pings only). Described in privacy.html §5.
(function () {
  var ID = "G-J5P5VLP02T";
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  var EEA = ["AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE","IT","LV","LT","LU",
             "MT","NL","PL","PT","RO","SK","SI","ES","SE","IS","LI","NO","GB","CH"];
  gtag("consent", "default", {
    ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "granted"
  });
  gtag("consent", "default", { analytics_storage: "denied", region: EEA });

  function lang() {
    var d = document.documentElement;
    return d.getAttribute("data-lang") || (d.getAttribute("lang") || "").slice(0, 2) || "en";
  }
  gtag("js", new Date());
  gtag("config", ID, { site_lang: lang(), allow_google_signals: false });

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
  document.head.appendChild(s);

  // Which app a store link belongs to — read from the link itself, so no page needs extra markup.
  var APPS = {
    "com.redmoon.topikvocab": "topik", "6814852323": "topik",
    "com.redmoon.hanjamaster": "hanjamaster", "6816827429": "hanjamaster",
    "com.redmoon.cjkhanja": "cjk", "6822160755": "cjk",
    "com.redmoon.jpvocab": "jp", "6823103394": "jp",
    "com.redmoon.english_vocab": "english",
    "com.redmoon.sudoku": "sudoku", "6819275133": "sudoku",
    "com.redmoon.potionlab": "potionlab",
    "com.redmoon.richpuzzle2048": "puzzle2048",
    "com.redmoon.twinflip": "twinflip",
    "com.redmoon.smartflip": "smartflip"
  };
  function appOf(href) {
    var m = /[?&]id=([\w.]+)/.exec(href) || /\/id(\d+)/.exec(href);
    return (m && APPS[m[1]]) || "other";
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (a) {
      var href = a.href;
      var store = href.indexOf("play.google.com/store/apps") >= 0 ? "google_play"
                : href.indexOf("apps.apple.com/") >= 0 ? "app_store" : null;
      if (store) {
        gtag("event", "store_click", {
          app: appOf(href), store: store, site_lang: lang(),
          from_page: location.pathname.replace(/^\//, "") || "index",
          transport_type: "beacon"
        });
      }
      return;
    }
    var b = e.target.closest && e.target.closest(".lang-switch button[data-set], button.lang[data-set]");
    if (b) gtag("event", "lang_switch", { site_lang: b.getAttribute("data-set") });
  }, true);
})();
