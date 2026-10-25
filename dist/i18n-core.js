/* Phrase-based UI localization. Canonical data values remain unchanged. */
(function(root){
 function createTranslator(catalogs){
  const keys=Object.keys(catalogs.en).sort((a,b)=>b.length-a.length);
  const pattern=new RegExp(keys.map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');
  return function translate(source,locale){
   if(locale==='zh-Hans'||!source)return source;
   const table=catalogs[locale];if(!table)return source;
   let result=source.replace(pattern,key=>table[key]??key);
   if(locale==='en'&&/[\u3400-\u9fff]/.test(source))result=result.replace(/，/g,', ').replace(/。/g,'. ').replace(/；/g,'; ').replace(/：/g,': ').replace(/？/g,'?').replace(/！/g,'!').replace(/（/g,'(').replace(/）/g,')').replace(/、/g,', ').replace(/MaplePath MaplePath/g,'MaplePath');
   return locale==='en'?result.replace(/[ \t]{2,}/g,' '):result;
  };
 }
 if(typeof module!=='undefined'&&module.exports)module.exports={createTranslator};
 else root.MapleI18nCore={createTranslator};
})(globalThis);
