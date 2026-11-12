import assert from 'node:assert/strict';
import fs from 'node:fs';
const games=JSON.parse(fs.readFileSync('data/games.json','utf8'));
const allowed=new Set(['Food Wheel','Jackpot','Slots','Board']);
const expected=['lion_food','night_food','jackpot_fruit','slots','sovera_gaddy','sovera_food','carrom','greedy_wheel'];
assert.deepEqual(games.map(x=>x.id),expected,'Catalogue should match the hosted eight-game set');
for (const game of games){
 assert.ok(game.name&&game.description&&game.symbol);
 assert.ok(allowed.has(game.category));
}
const html=fs.readFileSync('index.html','utf8');
const script=fs.readFileSync('assets/site.js','utf8');
assert.ok(html.includes('Play Original Games'));
assert.ok(html.includes('Manual USD')||html.includes('payment'));
assert.ok(script.includes('data/games.json'));
assert.ok(script.includes('/demo'));
assert.ok(html.includes('https://soverix-royal-crystal-3d.soverixnet.workers.dev/'),'Live 3D game must be linked from the homepage');
const demo=fs.readFileSync('demos/royal-crystal-run-3d/index.html','utf8');
assert.ok(demo.includes('Royal Crystal Run 3D') && demo.includes('id="game"'),'Playable WebGL game must exist');
assert.ok(demo.includes("const LEVELS=[") && demo.includes("'CRYSTAL EMPEROR'") && demo.includes("'FIRE GUARDIAN'"),'10-stage campaign and bosses must exist');
assert.ok(demo.includes('function stageCheck()') && demo.includes('function boss3D()'),'Campaign and boss gameplay functions must exist');
assert.ok(demo.includes('DAILY=') && demo.includes('RANKING · THIS DEVICE'),'Missions and local ranking must exist');
const battle=fs.readFileSync('demos/royal-battle-3d/index.html','utf8');
assert.ok(html.includes('https://soverix-royal-battle-preview.soverixnet.workers.dev/'),'Royal Battle preview must be linked from homepage');
assert.ok(battle.includes('function sword()') && battle.includes('function special()') && battle.includes('function dodge()'),'Playable sword, special and dodge actions must exist');
assert.ok(battle.includes('function spawnWave(') && battle.includes('function chooseUpgrade(') && battle.includes('SHADOW KING'),'Wave upgrades and boss must exist');
assert.ok(!html.includes('<script src="https://soverix-games-provider-staging.soverixnet.workers.dev/original/'));
console.log('Validated public SOVERIX Game Center catalogue, links and frontend structure.');
