import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const script=readFileSync(new URL('../dist/hosting.js',import.meta.url),'utf8');
function setup(href){const location=new URL(href);const c=vm.createContext({URL,location,MAPLE_HOSTING_CONFIG:{basePath:'/Maple-Path/',hashRouting:true},history:{pushState(_,__,p){location.href=new URL(p,location).href},replaceState(_,__,p){location.href=new URL(p,location).href}},document:{body:{},querySelectorAll:()=>[]},MutationObserver:class{observe(){}},window:{addEventListener(){}}});vm.runInContext(script,c);return {run:s=>vm.runInContext(s,c),location}}
test('GitHub Pages routes retain project base and parse query strings',()=>{const c=setup('https://example.github.io/Maple-Path/#/schools?school=UBC');assert.equal(c.run('MapleHosting.route().pathname'),'/schools');assert.equal(c.run('MapleHosting.route().search'),'?school=UBC');c.run("MapleHosting.history.pushState({},'', '/student/academics')");assert.equal(c.location.href,'https://example.github.io/Maple-Path/#/student/academics')});
test('hosted anchor sections and login return targets survive encoding',()=>{const c=setup('https://example.github.io/Maple-Path/');assert.equal(c.run('MapleHosting.route().pathname'),'/');c.run("MapleHosting.history.replaceState({},'', '/login?next=%2Fstudent%2Freport')");assert.equal(c.run("MapleHosting.route().searchParams.get('next')"),'/student/report');c.run("MapleHosting.history.pushState({},'', '/#how-it-works')");assert.equal(c.run('MapleHosting.route().hash'),'#how-it-works')});
test('local clean URLs do not enable the hosting adapter',()=>{const c=vm.createContext({});vm.runInContext(script,c);assert.equal(c.MapleHosting,undefined)});
