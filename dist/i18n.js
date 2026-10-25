(function(){
 const supported=['zh-Hans','zh-Hant','en'],key='maplepath-language';
 let locale='zh-Hans';try{const saved=localStorage.getItem(key);if(supported.includes(saved))locale=saved}catch{}
 const translate=MapleI18nCore.createTranslator(MAPLE_LOCALES),textSources=new WeakMap(),attributeSources=new WeakMap();
 const controls=`<label class="language-control"><span class="language-icon" aria-hidden="true">◎</span><select aria-label="Language / 语言 / 語言" data-language-switch><option value="zh-Hans">简体中文</option><option value="zh-Hant">繁體中文</option><option value="en">English</option></select></label>`;
 let previousTitle='',sourceTitle='';
 const observer=new MutationObserver(()=>apply());
 function remap(node,value,cache){const old=cache.get(node);const source=old&&old.output===value?old.source:value;const output=translate(source,locale);cache.set(node,{source,output});return output}
 function apply(){
  observer.disconnect();
  for(const target of document.querySelectorAll('.public-account, main > header > div'))if(!target.querySelector('[data-language-switch]'))target.insertAdjacentHTML('afterbegin',controls);
  // Preserve each option's canonical value before changing its visible label.
  for(const option of document.querySelectorAll('option:not([value])'))option.setAttribute('value',option.textContent);
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let node;while(node=walker.nextNode()){
   if(node.parentElement?.closest('script,style,[data-language-switch],[data-no-translate],textarea,input'))continue;
   const output=remap(node,node.data,textSources);if(output!==node.data)node.data=output;
  }
  for(const element of document.querySelectorAll('[placeholder],[aria-label],[title],[alt]')){
   if(element.closest('[data-language-switch],[data-no-translate]'))continue;
   let cache=attributeSources.get(element);if(!cache){cache={};attributeSources.set(element,cache)}
   for(const name of ['placeholder','aria-label','title','alt'])if(element.hasAttribute(name)){
    const value=element.getAttribute(name),old=cache[name],source=old&&old.output===value?old.source:value,output=translate(source,locale);cache[name]={source,output};if(output!==value)element.setAttribute(name,output);
   }
  }
  for(const control of document.querySelectorAll('[data-language-switch]'))control.value=locale;
  document.documentElement.lang=locale;document.body.dataset.locale=locale;
  if(document.title!==previousTitle)sourceTitle=document.title;
  previousTitle=translate(sourceTitle,locale);if(document.title!==previousTitle)document.title=previousTitle;
  observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label','title','alt']});
 }
 document.addEventListener('change',event=>{if(!event.target.matches('[data-language-switch]'))return;locale=event.target.value;try{localStorage.setItem(key,locale)}catch{}apply()});
 // Dialogs, including deletion confirmation, follow the selected UI language.
 const originalConfirm=window.confirm.bind(window);window.confirm=message=>originalConfirm(translate(message,locale));
 const originalRender=render;render=function(){originalRender();apply()};
 window.MapleLanguage={normalizeQuery(text){return text.replace(/[\u3400-\u9fff]/g,c=>MAPLE_SEARCH_NORMALIZATION[c]||c)},get:()=>locale,set(value){if(!supported.includes(value))throw new Error('Unsupported language');locale=value;try{localStorage.setItem(key,locale)}catch{}apply()},translate};
 apply();
})();
