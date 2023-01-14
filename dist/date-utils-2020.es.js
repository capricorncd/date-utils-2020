/*!
 * date-utils-2020 v1.1.0
 * Author: Capricorncd
 * Repository: https://github.com/capricorncd/date-utils-2020#readme
 * Released on: 2023/01/14 14:10:19 GMT+0900
 */
function l(n) {
  return String(n).padStart(2, "0");
}
const a = {
  // weeks: ['日', '一', '二', '三', '四', '五', '六']
  weeks: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
};
function u(n, e, t) {
  const s = c(n);
  if (!s || !e)
    return String(n);
  if (e === "timestamp")
    return s.getTime().toString();
  if (/(y+)/i.test(e)) {
    const r = RegExp.$1;
    e = e.replace(r, (s.getFullYear() + "").substring(4 - r.length));
  }
  (!t || !Array.isArray(t.weeks)) && (t = a);
  const o = {
    "M+": s.getMonth() + 1,
    "d+": s.getDate(),
    "h+": s.getHours(),
    "m+": s.getMinutes(),
    "s+": s.getSeconds(),
    // // week number
    // 'w+': date.getDay(),
    // // week text
    // 'W+': langPackage.weeks[date.getDay()],
    // am/pm
    "a+": s.getHours() < 12 ? "am" : "pm",
    "A+": s.getHours() < 12 ? "AM" : "PM"
  };
  let g;
  for (const r in o)
    if (new RegExp("(" + r + ")").test(e)) {
      g = RegExp.$1;
      const i = o[r] + "";
      e = e.replace(g, g.length === 1 ? i : l(i));
    }
  if (/w+/i.test(e)) {
    const r = s.getDay();
    e = e.replace(/w+/i, /W+/.test(e) ? t.weeks[r] : String(r));
  }
  if (/g/i.test(e)) {
    const r = s.toString().split(/\s+/).slice(5), i = e.includes("g");
    e = e.replace(/g/i, i ? r[0] : r.join(" "));
  }
  return e;
}
function c(n) {
  let e = null;
  if (n instanceof Date)
    e = n;
  else if (typeof n == "number")
    e = new Date(n);
  else if (typeof n == "string") {
    let t = n.trim();
    if (/^\d+$/.test(t)) {
      const s = t.length;
      s === 8 ? e = new Date([t.substring(0, 4), t.substring(4, 6), t.substring(6, 8)].join("/")) : s === 6 ? e = new Date([t.substring(0, 4), t.substring(4, 6), "01"].join("/")) : s === 4 ? e = new Date(t + "/01/01") : e = new Date(parseInt(n));
    } else
      t = t.replace(/[年月日]/g, (s) => s === "日" ? "" : "/").replace(/[(（（].*?[)））]/g, " ").replace(/\bam|pm\b/ig, " ").replace(/\s+/g, " "), /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(t) ? e = new Date([RegExp.$1, RegExp.$2, RegExp.$3].join("/")) : /^(\d{4})[-/](\d{1,2})$/.test(t) ? e = new Date([RegExp.$1, RegExp.$2, "01"].join("/")) : e = new Date(t);
  }
  return e && !isNaN(e.getFullYear()) ? e : null;
}
export {
  u as formatDate,
  c as toDate,
  l as toTwoDigits
};
