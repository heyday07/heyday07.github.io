// Pick the page language before first paint (loaded synchronously in <head>).
// A page lists the languages it has in <html data-langs="ko en ja">; default "ko en ja".
// 0) ?lang=ko|en|ja|zh in the address (for sharing a link in a given language)
// 1) a language the visitor chose with the language switch
// 2) the visitor's time zone: Korea -> Korean, Japan -> Japanese, Taiwan/HK/Macau/China -> Chinese
// 3) the browser's language, if it is Korean, Japanese or Chinese
// 4) English for everyone else
// Each step only counts if the page has that language.
(function () {
  var d = document.documentElement;
  var langs = (d.getAttribute("data-langs") || "ko en ja").split(/\s+/);
  function has(l) { return langs.indexOf(l) >= 0; }
  var l = null;
  var m = /[?&]lang=(ko|en|ja|zh)\b/.exec(location.search);
  if (m && has(m[1])) l = m[1];
  if (!l) { try { var c = localStorage.getItem("rml-lang-choice"); if (has(c)) l = c; } catch (e) {} }
  if (!l) {
    var tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
    var byZone = { "Asia/Seoul": "ko", "ROK": "ko", "Asia/Tokyo": "ja", "Japan": "ja",
      "Asia/Taipei": "zh", "ROC": "zh", "Asia/Hong_Kong": "zh", "Hongkong": "zh", "Asia/Macau": "zh",
      "Asia/Shanghai": "zh", "PRC": "zh", "Asia/Chongqing": "zh", "Asia/Harbin": "zh", "Asia/Urumqi": "zh" };
    if (has(byZone[tz])) l = byZone[tz];
  }
  if (!l) {
    var n = String((navigator.languages && navigator.languages[0]) || navigator.language || "").toLowerCase().slice(0, 2);
    if ((n === "ko" || n === "ja" || n === "zh") && has(n)) l = n;
  }
  if (!l) l = "en";
  d.setAttribute("data-lang", l);
  d.setAttribute("lang", l === "zh" ? "zh-Hant" : l);
})();
