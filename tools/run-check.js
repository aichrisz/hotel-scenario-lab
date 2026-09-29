// Harness untuk jalankan validator HSL tanpa browser. Mock window → global.
global.window = global;
const fs = require('fs');
const path = require('path');
const ROOT = process.cwd();

// Load i18n dicts
['de','en','id'].forEach(l => {
  new Function('window','require','module', fs.readFileSync(path.join(ROOT,'i18n',l+'.js'),'utf8'))(global, global.require, {exports:{}});
});
// Load registry
new Function('window','require','module', fs.readFileSync(path.join(ROOT,'data/registry.js'),'utf8'))(global, global.require, {exports:{}});
// Load engine (needed by check for TOTD)
try {
  new Function('window','require','module', fs.readFileSync(path.join(ROOT,'js/engine.js'),'utf8'))(global, global.require, {exports:{}});
} catch(e) { console.log('engine warn:', e.message); }
// Load store if needed
try {
  new Function('window','require','module', fs.readFileSync(path.join(ROOT,'js/store.js'),'utf8'))(global, global.require, {exports:{}});
} catch(e) {}

// Load all scenarios
const files = fs.readdirSync(path.join(ROOT,'data/scenarios')).filter(f=>f.endsWith('.js'));
files.forEach(f => {
  try { new Function('window','require','module', fs.readFileSync(path.join(ROOT,'data/scenarios',f),'utf8'))(global, global.require, {exports:{}}); }
  catch(e) { console.log('scenario load FAIL', f, e.message); }
});
console.log('scenarios loaded:', Object.keys(HSL.data.scenarios).length);

// Load validator
new Function('window','require','module', fs.readFileSync(path.join(ROOT,'tools/check.js'),'utf8'))(global, global.require, {exports:{}});
const api = HSL.check;
const run = api.runAll || api.run || api.all || (typeof api === 'function' ? api : null);
if (!run) { console.log('check API keys:', Object.keys(api)); process.exit(1); }
const results = run();
const arr = Array.isArray(results) ? results : (results.results || []);
let pass=0, fail=0;
arr.forEach(r => { if (r.pass) pass++; else { fail++; console.log('FAIL', r.id, r.name, '-', (r.detail||'').slice(0,100)); } });
console.log('=== VALIDATOR: ' + pass + '/' + (pass+fail) + ' PASS ===');
process.exit(fail ? 1 : 0);
