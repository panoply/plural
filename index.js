"use strict";function h(u,...e){let n;if(typeof e=="number")n=e;else if(Array.isArray(e))n=e.map((r,l,s)=>typeof r=="number"?r:Array.isArray(r)?r.length:s.length);else return u;return u.replace(/#{[N0-9]{1}}|#{(?![N0-9])\w+(?:\|\w+)?}(?:{[N0-9]})?/g,r=>{var l,s;if(r.charCodeAt(3)===125){if(r.charCodeAt(2)===78||r.charCodeAt(2)===48)return String((l=n[0])!=null?l:r);if(/[1-9]/.test(r[2]))return String((s=n[r[2]])!=null?s:r)}const c=r.indexOf("|"),o=r.indexOf("}{"),i=r.length,f=/[1-9]/.test(r[i-2])?n[r[i-2]]:n[0];return c>2?f>1?r.slice(c+1,i-(o>2?4:1)):r.slice(2,c):r.slice(2,i-(o>2?4:1))+(f>1?"s":"")})}module.exports=h;
