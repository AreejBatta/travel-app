if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,t)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let o={};const f=e=>n(e,s),l={module:{uri:s},exports:o,require:f};i[s]=Promise.all(r.map((e=>l[e]||f(e)))).then((e=>(t(...e),o)))}}define(["./workbox-1f84e78b"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"./index.html",revision:"e078dee17388f9d891e4b5499389c608"},{url:"bundle.js",revision:"e137990a37321e33e505a8c28f99a7a2"},{url:"bundle.js.LICENSE.txt",revision:"4e0e34f265fae8f33b01b27ae29d9d6f"},{url:"mini.css",revision:"5aeee7f0839b0bf57804307bff7f3120"}],{})}));
//# sourceMappingURL=service-worker.js.map
