// Pick the page language before first paint (loaded synchronously in <head>).
// 0) ?lang=ko|en|ja in the address (for sharing a link in a given language)
// 1) a language the visitor chose with the KO/EN/JP switch
// 2) the visitor's time zone: Korea -> Korean, Japan -> Japanese
// 3) the browser's language, if it is Korean or Japanese
// 4) English for everyone else
(function () {
  var d = document.documentElement, l = null;
  var m = /[?&]lang=(ko|en|ja)\b/.exec(location.search);
  if (m) l = m[1];
  else try { l = localStorage.getItem("rml-lang-choice"); } catch (e) {}
  if (l !== "ko" && l !== "en" && l !== "ja") {
    var tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
    if (tz === "Asia/Seoul" || tz === "ROK") l = "ko";
    else if (tz === "Asia/Tokyo" || tz === "Japan") l = "ja";
    else {
      var n = String((navigator.languages && navigator.languages[0]) || navigator.language || "").toLowerCase();
      l = n.indexOf("ko") === 0 ? "ko" : n.indexOf("ja") === 0 ? "ja" : "en";
    }
  }
  d.setAttribute("data-lang", l);
  d.setAttribute("lang", l);
})();
