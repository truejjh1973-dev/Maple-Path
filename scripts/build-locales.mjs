import {readFile,writeFile} from 'node:fs/promises';
const read=async name=>JSON.parse(await readFile(new URL('../locales/'+name,import.meta.url),'utf8'));
const en=await read('en.json'),traditional=await read('zh-Hant.json'),normalization=await read('search-normalization.json');
if(Object.keys(en).some(key=>!traditional[key]))throw Error('Missing Traditional Chinese catalog entry');
await writeFile(new URL('../dist/locales.js',import.meta.url),'/* Bundled local translations. See locales/README.md. */\nglobalThis.MAPLE_LOCALES='+JSON.stringify({en,'zh-Hant':traditional})+';\nglobalThis.MAPLE_SEARCH_NORMALIZATION='+JSON.stringify(normalization)+';\n');
console.log('Bundled '+Object.keys(en).length+' entries in each language catalog.');
