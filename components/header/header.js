const componentBase=new URL(".",import.meta.url);
const mount=document.querySelector("[data-site-header]");

function ensureHeaderStyle(){
  if(document.querySelector('link[data-component-style="site-header"]'))return;
  const link=document.createElement("link");
  link.rel="stylesheet";
  link.href=new URL("header.css",componentBase).href;
  link.dataset.componentStyle="site-header";
  document.head.append(link);
}

function setActiveMenu(root){
  const file=location.pathname.split("/").pop()||"creafit_main_custom_why_060_0055_auto_portfolio_drag.html";
  const targets={
    "creafit_main_custom_why_060_0055_auto_portfolio_drag.html":"creafit_main_custom_why_060_0055_auto_portfolio_drag.html#about",
    "website.html":"website.html",
    "brand-blog.html":"brand-blog.html",
    "marketing.html":"marketing.html",
    "portfolio.html":"portfolio.html"
  };
  const target=targets[file];
  if(!target)return;
  const link=[...root.querySelectorAll(".menu-link")].find(item=>item.getAttribute("href")===target);
  if(link){link.classList.add("active");link.setAttribute("aria-current","page")}
}

function initHeader(root){
  const header=root.querySelector("#siteHeader");
  const button=root.querySelector(".mobile-menu-btn");
  const nav=root.querySelector("#mainNav");
  const sync=()=>header?.classList.toggle("is-scrolled",scrollY>28);
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
  nav?.addEventListener("click",event=>{
    if(innerWidth<=900&&event.target.closest("a"))close();
  });
  addEventListener("resize",()=>{if(innerWidth>900)close()});
  setActiveMenu(root);
}

async function mountHeader(){
  if(!mount)return;
  ensureHeaderStyle();
  const response=await fetch(new URL("header.html",componentBase));
  if(!response.ok)throw new Error(`Header component load failed: ${response.status}`);
  mount.innerHTML=await response.text();
  initHeader(mount);
  document.dispatchEvent(new CustomEvent("site-header:ready"));
}

mountHeader().catch(error=>console.error(error));
