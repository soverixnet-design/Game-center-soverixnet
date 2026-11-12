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
assert.ok(!html.includes('<script src="https://soverix-games-provider-staging.soverixnet.workers.dev/original/'));
console.log('Validated public SOVERIX Game Center catalogue, links and frontend structure.');
