(()=>{
 const h=document.querySelector("#siteHeader"),b=document.querySelector(".mobile-menu-btn"),n=document.querySelector("#mainNav"),p=document.querySelector(".progress span");
 const sync=()=>{h?.classList.toggle("is-scrolled",scrollY>25);if(p){const m=document.documentElement.scrollHeight-innerHeight;p.style.width=(m>0?scrollY/m*100:0)+"%"}};
 sync();addEventListener("scroll",sync,{passive:true});b?.addEventListener("click",()=>{const o=document.body.classList.toggle("menu-open");b.setAttribute("aria-expanded",String(o))});n?.addEventListener("click",()=>document.body.classList.remove("menu-open"));
 if(window.AOS)AOS.init({duration:800,easing:"ease-out-cubic",once:true,offset:60});
 document.querySelectorAll(".common-cta a").forEach(btn=>{btn.addEventListener("pointermove",e=>{if(!window.gsap)return;const r=btn.getBoundingClientRect();gsap.to(btn,{x:(e.clientX-r.left-r.width/2)*.12,y:(e.clientY-r.top-r.height/2)*.18,duration:.3})});btn.addEventListener("pointerleave",()=>window.gsap&&gsap.to(btn,{x:0,y:0,duration:.5,ease:"elastic.out(1,.4)"}))});
})();