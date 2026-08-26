(()=>{
  const init=()=>{
    const header=document.querySelector("#siteHeader");
    const button=document.querySelector(".mobile-menu-btn");
    const nav=document.querySelector("#mainNav");
    if(!header||header.dataset.initialized==="true")return;
    header.dataset.initialized="true";
    const sync=()=>header.classList.toggle("is-scrolled",scrollY>28);
    const close=()=>{
      document.body.classList.remove("menu-open");
      button?.setAttribute("aria-expanded","false");
      button?.setAttribute("aria-label","메뉴 열기");
    };
    sync();
    addEventListener("scroll",sync,{passive:true});
    button?.addEventListener("click",()=>{
      const open=document.body.classList.toggle("menu-open");
      button.setAttribute("aria-expanded",String(open));
      button.setAttribute("aria-label",open?"메뉴 닫기":"메뉴 열기");
    });
    nav?.addEventListener("click",event=>{if(innerWidth<=900&&event.target.closest("a"))close()});
    addEventListener("resize",()=>{if(innerWidth>900)close()});
    const file=location.pathname.split("/").pop();
    const targets={"website.html":"website.html","brand-blog.html":"brand-blog.html","marketing.html":"marketing.html","portfolio.html":"portfolio.html"};
    const target=targets[file];
    if(target){
      const active=[...nav.querySelectorAll(".menu-link")].find(link=>link.getAttribute("href")===target);
      if(active){active.classList.add("active");active.setAttribute("aria-current","page")}
    }
    document.dispatchEvent(new CustomEvent("site-header:ready"));
  };
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init,{once:true}):init();
})();
