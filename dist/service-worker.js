if(!self.define){let e,i={};const s=(s,t)=>(s=new URL(s+".js",t).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(t,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let r={};const o=e=>s(e,n),f={module:{uri:n},exports:r,require:o};i[n]=Promise.all(t.map((e=>f[e]||o(e)))).then((e=>(c(...e),r)))}}define(["./workbox-ad8011fb"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"index.html",revision:"41f85d94c22a856fbdf85f299dfb8b71"},{url:"static/css/main.a69fa220df.css",revision:null},{url:"static/images/177bb55e84.jpeg",revision:null},{url:"static/js/346.js",revision:"20c82c0717b72992cc1cf7ff6087e8c3"},{url:"static/js/main.js",revision:"eaa32c1627e04f8895252aa84b3335b9"},{url:"static/js/math.chunk.js",revision:"bc29e2a403b5f3a2b5d4ae7a04f06616"},{url:"static/js/runtime~main.js.js",revision:"c45341762706f69637af92c3398c8280"},{url:"static/media/42c571af06.woff?t=1660484361093",revision:null},{url:"static/media/952ba187cc.ttf?t=1660484361093",revision:null},{url:"static/media/b3fc86ee40.woff2?t=1660484361093",revision:null}],{})}));
//# sourceMappingURL=service-worker.js.map
