export function prettyNumber(number: number | undefined): string {
  if (number) return number.toLocaleString();
  return "XXX";
}

export function prettyDuration(seconds: number): string {
  let hours = 0;
  let minutes = 0;
  while (seconds > 60) {
    minutes += 1;
    seconds -= 60;
  }
  while (minutes > 60) {
    hours += 1;
    minutes -= 60;
  }
  let result = "";
  if (hours) result += hours.toString().padStart(2, "0") + ":";
  result += minutes.toString().padStart(2, "0") + ":";
  result += seconds.toString().padStart(2, "0");
  return result;
}

export function prettyDate(string: string | undefined): string {
  if (string) {
    const date = new Date(string);
    const year = date.getUTCFullYear().toString().padStart(4, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  } else {
    return "XXXX/XX/XX"
  }
}

export function prettyDateTime(string: string | null) {
  if (string) {
    const date = new Date(string);
    const year = date.getUTCFullYear().toString().padStart(4, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.toLocaleTimeString();
    return `${year}/${month}/${day} - ${hours}`;
  } else {
    return " - ";
  }
}

export function prettyDateTimeDiff(
  stringA: string | null,
  stringB: string | null
) {
  if (stringB) {
    if (stringA) {
      const unixA = new Date(stringA).getTime();
      const unixB = new Date(stringB).getTime();
      let diffSeconds = Math.abs(unixB - unixA) / 1000;
      let diffMinutes = 0;
      let diffHours = 0;
      while (diffSeconds > 60) {
        diffSeconds -= 60;
        diffMinutes += 1;
      }
      while (diffMinutes > 60) {
        diffMinutes -= 60;
        diffHours += 1;
      }
      let result = "";
      if (diffHours > 0) result += `${diffHours} hours, `;
      if (diffMinutes > 0) result += `${diffMinutes} minutes, `;
      if (diffSeconds > 0) result += `${diffSeconds} secondes `;
      result += unixA > unixB ? "early" : "late";
      return result;
    } else {
      return prettyDateTime(stringB);
    }
  } else {
    return " - ";
  }
}

export function if2(value: any, fallback: any) {
  if (value) return value;
  return fallback;
}

export async function fetcher(url: string) {
  const res = await fetch(url, { method: "GET" });
  const json = await res.json();
  return json;
}

export async function fetcherPOST(url: string, auth: string) {
  const res = await fetch(url, {
    method: "POST",
    headers: { authorization: `Bearer ${auth}` },
  });
  const json = await res.json();
  return json;
}

/**
 * @author Anatoly Mironov (mirontoli)
 * http://sharepointkunskap.wordpress.com
 * http://www.bool.se
 *
 * http://stackoverflow.com/questions/3605495/generate-a-list-of-localized-language-names-with-links-to-google-translate/14800384#14800384
 * http://stackoverflow.com/questions/10997128/language-name-from-iso-639-1-code-in-javascript/14800499#14800499
 *
 * using Phil Teare's answer on stackoverflow
 * http://stackoverflow.com/questions/3217492/list-of-language-codes-in-yaml-or-json/4900304#4900304
 * Just for testing only. Incorporate in your own javascript namespace
 * Example: getLanguageName("cv-RU") --> Chuvash
 */
export function getLanguage(languageCode: string): string {
  /**
   * @author Phil Teare
   * using wikipedia data
   */

  const languages: { [key: string]: string } = {
    aa: "Afar",
    ab: "Abkhaz",
    ae: "Avestan",
    af: "Afrikaans",
    ak: "Akan",
    am: "Amharic",
    an: "Aragonese",
    ar: "Arabic",
    as: "Assamese",
    av: "Avaric",
    ay: "Aymara",
    az: "Azerbaijani",
    ba: "Bashkir",
    be: "Belarusian",
    bg: "Bulgarian",
    bh: "Bihari",
    bi: "Bislama",
    bm: "Bambara",
    bn: "Bengali",
    bo: "Tibetan",
    br: "Breton",
    bs: "Bosnian",
    ca: "Catalan",
    ce: "Chechen",
    ch: "Chamorro",
    co: "Corsican",
    cr: "Cree",
    cs: "Czech",
    cu: "Old Slavonic",
    cv: "Chuvash",
    cy: "Welsh",
    da: "Danish",
    de: "German",
    dv: "Divehi",
    ee: "Ewe",
    el: "Greek",
    en: "English",
    eo: "Esperanto",
    es: "Spanish",
    et: "Estonian",
    eu: "Basque",
    fa: "Persian",
    ff: "Fula",
    fi: "Finnish",
    fj: "Fijian",
    fo: "Faroese",
    fr: "French",
    fy: "Western Frisian",
    ga: "Irish",
    gd: "Gaelic",
    gl: "Galician",
    gn: "Guaraní",
    gu: "Gujarati",
    gv: "Manx",
    ha: "Hausa",
    he: "Hebrew",
    hi: "Hindi",
    ho: "Hiri Motu",
    hr: "Croatian",
    ht: "Haitian",
    hu: "Hungarian",
    hy: "Armenian",
    hz: "Herero",
    ia: "Interlingua",
    id: "Indonesian",
    ie: "Interlingue",
    ig: "Igbo",
    ii: "Nuosu",
    ik: "Inupiaq",
    io: "Ido",
    is: "Icelandic",
    it: "Italian",
    iu: "Inuktitut",
    ja: "Japanese",
    jv: "Javanese",
    ka: "Georgian",
    kg: "Kongo",
    ki: "Gikuyu",
    kj: "Kuanyama",
    kk: "Kazakh",
    kl: "Greenlandic",
    km: "Khmer",
    kn: "Kannada",
    ko: "Korean",
    kr: "Kanuri",
    ks: "Kashmiri",
    ku: "Kurdish",
    kv: "Komi",
    kw: "Cornish",
    ky: "Kyrgyz",
    la: "Latin",
    lb: "Letzeburgesch",
    lg: "Luganda",
    li: "Limburger",
    ln: "Lingala",
    lo: "Lao",
    lt: "Lithuanian",
    lu: "Luba-Katanga",
    lv: "Latvian",
    mg: "Malagasy",
    mh: "Marshallese",
    mi: "Māori",
    mk: "Macedonian",
    ml: "Malayalam",
    mn: "Mongolian",
    mr: "Marathi",
    ms: "Malay",
    mt: "Maltese",
    my: "Burmese",
    na: "Nauru",
    nb: "Norwegian Bokmål",
    nd: "North Ndebele",
    ne: "Nepali",
    ng: "Ndonga",
    nl: "Dutch",
    nn: "Norwegian Nynorsk",
    no: "Norwegian",
    nr: "South Ndebele",
    nv: "Navajo",
    ny: "Chichewa",
    oc: "Occitan",
    oj: "Ojibwe",
    om: "Oromo",
    or: "Oriya",
    os: "Ossetian",
    pa: "Panjabi",
    pi: "Pāli",
    pl: "Polish",
    ps: "Pashto",
    pt: "Portuguese",
    qu: "Quechua",
    rm: "Romansh",
    rn: "Kirundi",
    ro: "Romanian",
    ru: "Russian",
    rw: "Kinyarwanda",
    sa: "Sanskrit",
    sc: "Sardinian",
    sd: "Sindhi",
    se: "Northern Sami",
    sg: "Sango",
    si: "Sinhala",
    sk: "Slovak",
    sl: "Slovene",
    sm: "Samoan",
    sn: "Shona",
    so: "Somali",
    sq: "Albanian",
    sr: "Serbian",
    ss: "Swati",
    st: "Southern Sotho",
    su: "Sundanese",
    sv: "Swedish",
    sw: "Swahili",
    ta: "Tamil",
    te: "Telugu",
    tg: "Tajik",
    th: "Thai",
    ti: "Tigrinya",
    tk: "Turkmen",
    tl: "Tagalog",
    tn: "Tswana",
    to: "Tonga",
    tr: "Turkish",
    ts: "Tsonga",
    tt: "Tatar",
    tw: "Twi",
    ty: "Tahitian",
    ug: "Uighurr",
    uk: "Ukrainian",
    ur: "Urdu",
    uz: "Uzbek",
    ve: "Venda",
    vi: "Vietnamese",
    vo: "Volapük",
    wa: "Walloon",
    wo: "Wolof",
    xh: "Xhosa",
    yi: "Yiddish",
    yo: "Yoruba",
    za: "Zhuang",
    zh: "Chinese",
  };

  return languages[languageCode];
}
