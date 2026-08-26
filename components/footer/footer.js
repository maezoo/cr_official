const componentBase=new URL(".",import.meta.url);
const mount=document.querySelector("[data-site-footer]");

function ensureFooterStyle(){
  if(document.querySelector('link[data-component-style="site-footer"]'))return;
  const link=document.createElement("link");
  link.rel="stylesheet";
  link.href=new URL("footer.css",componentBase).href;
  link.dataset.componentStyle="site-footer";
  document.head.append(link);
}

async function mountFooter(){
  if(!mount)return;
  ensureFooterStyle();
  const response=await fetch(new URL("footer.html",componentBase));
  if(!response.ok)throw new Error(`Footer component load failed: ${response.status}`);
  mount.innerHTML=await response.text();
  document.dispatchEvent(new CustomEvent("site-footer:ready"));
}

mountFooter().catch(error=>console.error(error));
