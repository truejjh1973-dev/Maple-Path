/* Optional GitHub Pages project-path adapter. Local clean URLs are unchanged. */
(function(root){
 const config=root.MAPLE_HOSTING_CONFIG;if(!config?.hashRouting)return;
 const base='/'+String(config.basePath||'').replace(/^\/+|\/+$/g,'')+'/';
 const decode=url=>{
  if(url.origin===location.origin&&url.pathname.startsWith(base))return new URL(url.hash.startsWith('#/')?url.hash.slice(1):'/',location.origin);
  return url;
 };
 const href=target=>base+'#'+(String(target).startsWith('/')?target:'/'+target);
 const prepare=()=>{for(const link of document.querySelectorAll('a[href^="/"]')){const raw=link.getAttribute('href');if(raw.startsWith('//')||raw.startsWith(base+'#'))continue;link.setAttribute('href',href(raw))}};
 root.MapleHosting={base,decode,href,route:()=>decode(new URL(location.href)),history:{pushState(state,title,target){history.pushState(state,title,href(target))},replaceState(state,title,target){history.replaceState(state,title,href(target))}}};
 new MutationObserver(prepare).observe(document.body,{subtree:true,childList:true});prepare();
 window.addEventListener('hashchange',()=>window.dispatchEvent(new PopStateEvent('popstate')));
})(globalThis);
