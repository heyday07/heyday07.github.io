// RedMoon Lab site behaviour (loaded with defer on every page).
//  - KO / EN / JP switch: remembers an explicit choice (assets/lang.js picks the first language)
//  - App Store links open the visitor's own storefront. A link without a country code
//    (apps.apple.com/app/id...) always lands on the US store in desktop and Android browsers,
//    so we guess the country in the browser -- time zone, then the language's region, then the
//    language's usual country -- and insert it. Nothing is sent anywhere; unknown = unchanged.
//    Time zone table: IANA tzdata 2026f (zone.tab + backward links).
(function () {
  var root = document.documentElement;

  // ---- language switch ----
  var buttons = document.querySelectorAll(".lang-switch button[data-set]");
  function show(l) {
    root.setAttribute("data-lang", l);
    root.setAttribute("lang", l);
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute("aria-pressed", String(buttons[i].getAttribute("data-set") === l));
    }
  }
  for (var b = 0; b < buttons.length; b++) {
    buttons[b].addEventListener("click", function () {
      var l = this.getAttribute("data-set");
      try { localStorage.setItem("rml-lang-choice", l); } catch (e) {}
      show(l);
    });
  }
  show(root.getAttribute("data-lang") || "en");

  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  // ---- App Store storefront ----
  var BY_COUNTRY = {"ad":"Europe/Andorra","ae":"Asia/Dubai","af":"Asia/Kabul","ag":"America/Antigua","ai":"America/Anguilla","al":"Europe/Tirane","am":"Asia/Yerevan","ao":"Africa/Luanda","aq":"Antarctica/Casey Antarctica/Davis Antarctica/DumontDUrville Antarctica/Mawson Antarctica/McMurdo Antarctica/Palmer Antarctica/Rothera Antarctica/Syowa Antarctica/Troll Antarctica/Vostok","ar":"America/Argentina/Buenos_Aires America/Argentina/Catamarca America/Argentina/ComodRivadavia America/Argentina/Cordoba America/Argentina/Jujuy America/Argentina/La_Rioja America/Argentina/Mendoza America/Argentina/Rio_Gallegos America/Argentina/Salta America/Argentina/San_Juan America/Argentina/San_Luis America/Argentina/Tucuman America/Argentina/Ushuaia America/Buenos_Aires America/Catamarca America/Cordoba America/Jujuy America/Mendoza America/Rosario","as":"Pacific/Pago_Pago Pacific/Samoa US/Samoa","at":"Europe/Vienna","au":"Antarctica/Macquarie Australia/ACT Australia/Adelaide Australia/Brisbane Australia/Broken_Hill Australia/Canberra Australia/Currie Australia/Darwin Australia/Eucla Australia/Hobart Australia/LHI Australia/Lindeman Australia/Lord_Howe Australia/Melbourne Australia/NSW Australia/North Australia/Perth Australia/Queensland Australia/South Australia/Sydney Australia/Tasmania Australia/Victoria Australia/West Australia/Yancowinna","aw":"America/Aruba","ax":"Europe/Mariehamn","az":"Asia/Baku","ba":"Europe/Sarajevo","bb":"America/Barbados","bd":"Asia/Dacca Asia/Dhaka","be":"CET Europe/Brussels MET","bf":"Africa/Ouagadougou","bg":"Europe/Sofia","bh":"Asia/Bahrain","bi":"Africa/Bujumbura","bj":"Africa/Porto-Novo","bl":"America/St_Barthelemy","bm":"Atlantic/Bermuda","bn":"Asia/Brunei","bo":"America/La_Paz","bq":"America/Kralendijk","br":"America/Araguaina America/Bahia America/Belem America/Boa_Vista America/Campo_Grande America/Cuiaba America/Eirunepe America/Fortaleza America/Maceio America/Manaus America/Noronha America/Porto_Acre America/Porto_Velho America/Recife America/Rio_Branco America/Santarem America/Sao_Paulo Brazil/Acre Brazil/DeNoronha Brazil/East Brazil/West","bs":"America/Nassau","bt":"Asia/Thimbu Asia/Thimphu","bw":"Africa/Gaborone","by":"Europe/Minsk","bz":"America/Belize","ca":"America/Atikokan America/Blanc-Sablon America/Cambridge_Bay America/Creston America/Dawson America/Dawson_Creek America/Edmonton America/Fort_Nelson America/Glace_Bay America/Goose_Bay America/Halifax America/Inuvik America/Iqaluit America/Moncton America/Montreal America/Nipigon America/Pangnirtung America/Rainy_River America/Rankin_Inlet America/Regina America/Resolute America/St_Johns America/Swift_Current America/Thunder_Bay America/Toronto America/Vancouver America/Whitehorse America/Winnipeg America/Yellowknife Canada/Atlantic Canada/Central Canada/Eastern Canada/Mountain Canada/Newfoundland Canada/Pacific Canada/Saskatchewan Canada/Yukon","cc":"Indian/Cocos","cd":"Africa/Kinshasa Africa/Lubumbashi","cf":"Africa/Bangui","cg":"Africa/Brazzaville","ch":"Europe/Zurich","ci":"Africa/Abidjan Africa/Timbuktu Iceland","ck":"Pacific/Rarotonga","cl":"America/Coyhaique America/Punta_Arenas America/Santiago Chile/Continental Chile/EasterIsland Pacific/Easter","cm":"Africa/Douala","cn":"Asia/Chongqing Asia/Chungking Asia/Harbin Asia/Kashgar Asia/Shanghai Asia/Urumqi PRC","co":"America/Bogota","cr":"America/Costa_Rica","cu":"America/Havana Cuba","cv":"Atlantic/Cape_Verde","cw":"America/Curacao","cx":"Indian/Christmas","cy":"Asia/Famagusta Asia/Nicosia Europe/Nicosia","cz":"Europe/Prague","de":"Atlantic/Jan_Mayen Europe/Berlin Europe/Busingen","dj":"Africa/Djibouti","dk":"Europe/Copenhagen","dm":"America/Dominica","do":"America/Santo_Domingo","dz":"Africa/Algiers","ec":"America/Guayaquil Pacific/Galapagos","ee":"Europe/Tallinn","eg":"Africa/Cairo Egypt","eh":"Africa/El_Aaiun","er":"Africa/Asmara","es":"Africa/Ceuta Atlantic/Canary Europe/Madrid","et":"Africa/Addis_Ababa","fi":"Europe/Helsinki","fj":"Pacific/Fiji","fk":"Atlantic/Stanley","fm":"Pacific/Chuuk Pacific/Kosrae Pacific/Pohnpei","fo":"Atlantic/Faeroe Atlantic/Faroe","fr":"Europe/Paris","ga":"Africa/Libreville","gb":"Europe/Belfast Europe/London GB GB-Eire","gd":"America/Grenada","ge":"Asia/Tbilisi","gf":"America/Cayenne","gg":"Europe/Guernsey","gh":"Africa/Accra","gi":"Europe/Gibraltar","gl":"America/Danmarkshavn America/Godthab America/Nuuk America/Scoresbysund America/Thule","gm":"Africa/Banjul","gn":"Africa/Conakry","gp":"America/Guadeloupe","gq":"Africa/Malabo","gr":"EET Europe/Athens","gs":"Atlantic/South_Georgia","gt":"America/Guatemala","gu":"Pacific/Guam","gw":"Africa/Bissau","gy":"America/Guyana","hk":"Asia/Hong_Kong Hongkong","hn":"America/Tegucigalpa","hr":"Europe/Zagreb","ht":"America/Port-au-Prince","hu":"Europe/Budapest","id":"Asia/Jakarta Asia/Jayapura Asia/Makassar Asia/Pontianak Asia/Ujung_Pandang","ie":"Eire Europe/Dublin","il":"Asia/Jerusalem Asia/Tel_Aviv Israel","im":"Europe/Isle_of_Man","in":"Asia/Calcutta Asia/Kolkata","io":"Indian/Chagos","iq":"Asia/Baghdad","ir":"Asia/Tehran Iran","is":"Atlantic/Reykjavik","it":"Europe/Rome","je":"Europe/Jersey","jm":"America/Jamaica Jamaica","jo":"Asia/Amman","jp":"Asia/Tokyo Japan","ke":"Africa/Asmera Africa/Nairobi","kg":"Asia/Bishkek","kh":"Asia/Phnom_Penh","ki":"Pacific/Enderbury Pacific/Kanton Pacific/Kiritimati Pacific/Tarawa","km":"Indian/Comoro","kn":"America/St_Kitts","kp":"Asia/Pyongyang","kr":"Asia/Seoul ROK","kw":"Asia/Kuwait","ky":"America/Cayman","kz":"Asia/Almaty Asia/Aqtau Asia/Aqtobe Asia/Atyrau Asia/Oral Asia/Qostanay Asia/Qyzylorda","la":"Asia/Vientiane","lb":"Asia/Beirut","lc":"America/St_Lucia","li":"Europe/Vaduz","lk":"Asia/Colombo","lr":"Africa/Monrovia","ls":"Africa/Maseru","lt":"Europe/Vilnius","lu":"Europe/Luxembourg","lv":"Europe/Riga","ly":"Africa/Tripoli Libya","ma":"Africa/Casablanca","mc":"Europe/Monaco","md":"Europe/Chisinau Europe/Tiraspol","me":"Europe/Podgorica","mf":"America/Marigot","mg":"Indian/Antananarivo","mh":"Kwajalein Pacific/Kwajalein Pacific/Majuro","mk":"Europe/Skopje","ml":"Africa/Bamako","mm":"Asia/Rangoon Asia/Yangon","mn":"Asia/Choibalsan Asia/Hovd Asia/Ulaanbaatar Asia/Ulan_Bator","mo":"Asia/Macao Asia/Macau","mp":"Pacific/Saipan","mq":"America/Martinique","mr":"Africa/Nouakchott","ms":"America/Montserrat","mt":"Europe/Malta","mu":"Indian/Mauritius","mv":"Indian/Maldives","mw":"Africa/Blantyre","mx":"America/Bahia_Banderas America/Cancun America/Chihuahua America/Ciudad_Juarez America/Ensenada America/Hermosillo America/Matamoros America/Mazatlan America/Merida America/Mexico_City America/Monterrey America/Ojinaga America/Santa_Isabel America/Tijuana Mexico/BajaNorte Mexico/BajaSur Mexico/General","my":"Asia/Kuala_Lumpur Asia/Kuching","mz":"Africa/Maputo","na":"Africa/Windhoek","nc":"Pacific/Noumea","ne":"Africa/Niamey","nf":"Pacific/Norfolk","ng":"Africa/Lagos","ni":"America/Managua","nl":"Europe/Amsterdam","no":"Europe/Oslo","np":"Asia/Kathmandu Asia/Katmandu","nr":"Pacific/Nauru","nu":"Pacific/Niue","nz":"Antarctica/South_Pole NZ NZ-CHAT Pacific/Auckland Pacific/Chatham","om":"Asia/Muscat","pa":"America/Coral_Harbour America/Panama EST","pe":"America/Lima","pf":"Pacific/Gambier Pacific/Marquesas Pacific/Tahiti","pg":"Pacific/Bougainville Pacific/Port_Moresby Pacific/Truk Pacific/Yap","ph":"Asia/Manila","pk":"Asia/Karachi","pl":"Europe/Warsaw Poland","pm":"America/Miquelon","pn":"Pacific/Pitcairn","pr":"America/Puerto_Rico America/Virgin","ps":"Asia/Gaza Asia/Hebron","pt":"Atlantic/Azores Atlantic/Madeira Europe/Lisbon Portugal WET","pw":"Pacific/Palau","py":"America/Asuncion","qa":"Asia/Qatar","re":"Indian/Reunion","ro":"Europe/Bucharest","rs":"Europe/Belgrade","ru":"Asia/Anadyr Asia/Barnaul Asia/Chita Asia/Irkutsk Asia/Kamchatka Asia/Khandyga Asia/Krasnoyarsk Asia/Magadan Asia/Novokuznetsk Asia/Novosibirsk Asia/Omsk Asia/Sakhalin Asia/Srednekolymsk Asia/Tomsk Asia/Ust-Nera Asia/Vladivostok Asia/Yakutsk Asia/Yekaterinburg Europe/Astrakhan Europe/Kaliningrad Europe/Kirov Europe/Moscow Europe/Samara Europe/Saratov Europe/Ulyanovsk Europe/Volgograd W-SU","rw":"Africa/Kigali","sa":"Asia/Riyadh","sb":"Pacific/Guadalcanal Pacific/Ponape","sc":"Indian/Mahe","sd":"Africa/Khartoum","se":"Europe/Stockholm","sg":"Asia/Singapore Singapore","sh":"Atlantic/St_Helena","si":"Europe/Ljubljana","sj":"Arctic/Longyearbyen","sk":"Europe/Bratislava","sl":"Africa/Freetown","sm":"Europe/San_Marino","sn":"Africa/Dakar","so":"Africa/Mogadishu","sr":"America/Paramaribo","ss":"Africa/Juba","st":"Africa/Sao_Tome","sv":"America/El_Salvador","sx":"America/Lower_Princes","sy":"Asia/Damascus","sz":"Africa/Mbabane","tc":"America/Grand_Turk","td":"Africa/Ndjamena","tf":"Indian/Kerguelen","tg":"Africa/Lome","th":"Asia/Bangkok","tj":"Asia/Dushanbe","tk":"Pacific/Fakaofo","tl":"Asia/Dili","tm":"Asia/Ashgabat Asia/Ashkhabad","tn":"Africa/Tunis","to":"Pacific/Tongatapu","tr":"Asia/Istanbul Europe/Istanbul Turkey","tt":"America/Port_of_Spain","tv":"Pacific/Funafuti","tw":"Asia/Taipei ROC","tz":"Africa/Dar_es_Salaam","ua":"Europe/Kiev Europe/Kyiv Europe/Simferopol Europe/Uzhgorod Europe/Zaporozhye","ug":"Africa/Kampala","um":"Pacific/Midway Pacific/Wake","us":"America/Adak America/Anchorage America/Atka America/Boise America/Chicago America/Denver America/Detroit America/Fort_Wayne America/Indiana/Indianapolis America/Indiana/Knox America/Indiana/Marengo America/Indiana/Petersburg America/Indiana/Tell_City America/Indiana/Vevay America/Indiana/Vincennes America/Indiana/Winamac America/Indianapolis America/Juneau America/Kentucky/Louisville America/Kentucky/Monticello America/Knox_IN America/Los_Angeles America/Louisville America/Menominee America/Metlakatla America/New_York America/Nome America/North_Dakota/Beulah America/North_Dakota/Center America/North_Dakota/New_Salem America/Phoenix America/Shiprock America/Sitka America/Yakutat HST MST Navajo Pacific/Honolulu Pacific/Johnston US/Alaska US/Aleutian US/Arizona US/Central US/East-Indiana US/Eastern US/Hawaii US/Indiana-Starke US/Michigan US/Mountain US/Pacific","uy":"America/Montevideo","uz":"Asia/Samarkand Asia/Tashkent","va":"Europe/Vatican","vc":"America/St_Vincent","ve":"America/Caracas","vg":"America/Tortola","vi":"America/St_Thomas","vn":"Asia/Ho_Chi_Minh Asia/Saigon","vu":"Pacific/Efate","wf":"Pacific/Wallis","ws":"Pacific/Apia","ye":"Asia/Aden","yt":"Indian/Mayotte","za":"Africa/Johannesburg","zm":"Africa/Lusaka","zw":"Africa/Harare"};
  var LANG_COUNTRY = {ko:"kr",ja:"jp",vi:"vn",th:"th",id:"id",ms:"my",ar:"sa",pt:"br",de:"de",fr:"fr",es:"es",ru:"ru"};

  function fromTimeZone() {
    try {
      var zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (!zone) return null;
      for (var cc in BY_COUNTRY) {
        if ((" " + BY_COUNTRY[cc] + " ").indexOf(" " + zone + " ") >= 0) return cc;
      }
    } catch (e) {}
    return null;
  }
  function fromLanguage() {
    var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
    for (var i = 0; i < langs.length; i++) {
      var parts = String(langs[i]).split("-");
      for (var j = 1; j < parts.length; j++) {
        if (/^[A-Za-z]{2}$/.test(parts[j])) return parts[j].toLowerCase();
      }
      var base = parts[0].toLowerCase();
      if (base === "zh") return /hant/i.test(langs[i]) ? "tw" : "cn";
      if (LANG_COUNTRY[base]) return LANG_COUNTRY[base];
    }
    return null;
  }
  var cc = fromTimeZone() || fromLanguage();
  if (cc) {
    var links = document.querySelectorAll('a[href^="https://apps.apple.com/app/"]');
    for (var k = 0; k < links.length; k++) {
      links[k].href = links[k].href.replace("https://apps.apple.com/app/", "https://apps.apple.com/" + cc + "/app/");
    }
  }
})();
