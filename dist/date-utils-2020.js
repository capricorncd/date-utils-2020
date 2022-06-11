/*! For license information please see date-utils-2020.js.LICENSE.txt */
!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var r=t();for(var n in r)("object"==typeof exports?exports:e)[n]=r[n]}}("undefined"!=typeof self?self:this,(function(){return(()=>{"use strict";var e={949:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.toTwoDigits=void 0,t.toTwoDigits=function(e){return e[1]?e:"0"+e}},607:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.toTwoDigits=t.toDate=t.formatDate=void 0;var n=r(949);Object.defineProperty(t,"toTwoDigits",{enumerable:!0,get:function(){return n.toTwoDigits}});var i={weeks:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]};function o(e){if(e instanceof Date)return e;if("number"==typeof e)return new Date(e);if("string"==typeof e){var t=e.trim();if(/^\d+$/.test(t)){var r=t.length;return 8===r?new Date([t.substr(0,4),t.substr(4,2),t.substr(6,2)].join("/")):6===r?new Date([t.substr(0,4),t.substr(4,2),"01"].join("/")):4===r?new Date(t+"/01/01"):new Date(parseInt(e))}if(t=t.replace(/[年月日]/g,(function(e){return"日"===e?"":"/"})).replace(/[(（（].*?[)））]/g," ").replace(/\bam|pm\b/gi," ").replace(/\s+/g," "),/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.test(t))return new Date([RegExp.$1,RegExp.$2,RegExp.$3].join("/"));if(/^(\d{4})[-/](\d{1,2})$/.test(t))return new Date([RegExp.$1,RegExp.$2,"01"].join("/"));var n=new Date(t);return isNaN(n.getFullYear())?null:n}return null}t.formatDate=function(e,t,r){var s,a=o(e);if(!a||!t)return e+"";if("timestamp"===t)return a.getTime().toString();/(y+)/i.test(t)&&(s=RegExp.$1,t=t.replace(s,(a.getFullYear()+"").substr(4-s.length))),r&&Array.isArray(r.weeks)||(r=i);var u={"M+":a.getMonth()+1,"d+":a.getDate(),"h+":a.getHours(),"m+":a.getMinutes(),"s+":a.getSeconds(),"w+":a.getDay(),"W+":r.weeks[a.getDay()],"a+":a.getHours()<12?"am":"pm","A+":a.getHours()<12?"AM":"PM"};for(var f in u)if(new RegExp("("+f+")").test(t)){s=RegExp.$1;var g=u[f]+"";t=t.replace(s,1===s.length?g:n.toTwoDigits(g))}if(/(g)/i.test(t)){var p=a.toString().split(/\s+/).slice(5),l=t.includes("g");t=t.replace(/g/i,l?p[0]:p.join(" "))}return t},t.toDate=o}},t={};return function r(n){if(t[n])return t[n].exports;var i=t[n]={exports:{}};return e[n](i,i.exports,r),i.exports}(607)})()}));