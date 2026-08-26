(()=>{
  const init=()=>{
    const footer=document.querySelector("#contact");
    if(!footer||footer.dataset.initialized==="true")return;
    footer.dataset.initialized="true";
    document.dispatchEvent(new CustomEvent("site-footer:ready"));
  };
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init,{once:true}):init();
})();
