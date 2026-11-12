// SOVERIX Game Center — no-cash, no-purchase public practice API.
// Standalone from Sharika Main Wallet and from the original 8-game provider.
// Every settled round and account balance lives in isolated Cloudflare D1.
const ALLOWED_ORIGIN='https://soverix-game-center.soverixnet.workers.dev';
const CHIPS=new Set([100,1000,5000,10000,50000,100000]);
const RED=new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
const PAY=[25,18,12,9,6,4];
const START=1000000,MAX_BAL=1000000000;
function cors(o){const h={'access-control-allow-origin':ALLOWED_ORIGIN,'access-control-allow-methods':'GET,POST,OPTIONS','access-control-allow-headers':'authorization,content-type','access-control-max-age':'3600','vary':'Origin','cache-control':'no-store','x-content-type-options':'nosniff'};return h;}
function json(obj,status=200){return new Response(JSON.stringify(obj),{status,headers:{...cors(),'content-type':'application/json; charset=utf-8'}})}
function bad(message,status=400){return json({ok:false,error:message},status)}
function drawInt(max){const v=new Uint32Array(1),limit=Math.floor(4294967296/max)*max;do{crypto.getRandomValues(v)}while(v[0]>=limit);return v[0]%max}
function token(){const b=crypto.getRandomValues(new Uint8Array(32));return [...b].map(x=>x.toString(16).padStart(2,'0')).join('')}
async function digest(v){const bytes=new TextEncoder().encode(v),d=await crypto.subtle.digest('SHA-256',bytes);return [...new Uint8Array(d)].map(x=>x.toString(16).padStart(2,'0')).join('')}
function cleanName(n){return String(n||'').replace(/[<>&"'\x00-\x1f]/g,'').replace(/\s+/g,' ').trim().slice(0,24)}
function payoutSlot(inds,bet){const [a,b,c]=inds;if(a===b&&b===c)return bet*PAY[a];if(a===b||b===c||a===c)return bet;return 0;}
function rouletteMultiplier(n,b){if(b.type==='number')return n===b.value?36:0;if(n===0)return 0;if(b.type==='red')return RED.has(n)?2:0;if(b.type==='black')return RED.has(n)?0:2;if(b.type==='even')return n%2===0?2:0;if(b.type==='odd')return n%2===1?2:0;if(b.type==='low')return n<=18?2:0;if(b.type==='high')return n>=19?2:0;return 0;}
function validBet(b){if(!b||typeof b!=='object'||!Number.isSafeInteger(b.amount)||!CHIPS.has(b.amount))return false;const kinds=new Set(['number','red','black','even','odd','low','high']);if(!kinds.has(b.type))return false;if(b.type==='number')return Number.isInteger(b.value)&&b.value>=0&&b.value<=36;return true;}
function publicRow(p){return {id:p.id,name:p.name,balance:Number(p.balance),createdAt:p.created_at,lastSeenAt:p.last_seen_at}}
async function auth(req,env){const a=req.headers.get('authorization')||'';if(!/^Bearer [a-f0-9]{64}$/.test(a))return null;const hash=await digest(a.slice(7));return env.DB.prepare('SELECT id,name,balance,created_at,last_seen_at FROM players WHERE token_hash=?').bind(hash).first();}
async function body(req){if(Number(req.headers.get('content-length')||0)>8192)throw Error('Payload too large');const data=await req.json();if(!data||typeof data!=='object'||Array.isArray(data))throw Error('Invalid request');return data}
async function guest(req,env){let data;try{data=await body(req)}catch(e){return bad('Invalid guest request')};const name=cleanName(data.name);if(name.length<2)return bad('Enter a nickname (at least 2 characters).');
const t=token(),hash=await digest(t),id=crypto.randomUUID();await env.DB.prepare('INSERT INTO players(id,token_hash,name,balance) VALUES(?,?,?,?)').bind(id,hash,name,START).run();
return json({ok:true,token:t,player:{id,name,balance:START},wallet:'FREE_PRACTICE_ONLY'},201);}
async function getMe(req,env,p){const r=await env.DB.prepare('SELECT id,mode,stake,payout,result_json,bets_json,balance_after,created_at FROM rounds WHERE player_id=? ORDER BY created_at DESC LIMIT 30').bind(p.id).all();
return json({ok:true,player:publicRow(p),history:(r.results||[]).map(mapRound),wallet:'FREE_PRACTICE_ONLY'})}
function mapRound(r){return {id:r.id,mode:r.mode,stake:Number(r.stake),payout:Number(r.payout),result:JSON.parse(r.result_json),bets:JSON.parse(r.bets_json),balanceAfter:Number(r.balance_after),createdAt:r.created_at}}
async function refill(env,p){const r=await env.DB.prepare("UPDATE players SET balance=?,last_refill_at=CURRENT_TIMESTAMP,last_seen_at=CURRENT_TIMESTAMP WHERE id=? AND balance<100000 AND last_refill_at<datetime('now','-60 seconds') RETURNING balance").bind(START,p.id).first();if(!r)return bad('Free refill is available when balance is below 100K, with a short cooldown.',409);return json({ok:true,balance:Number(r.balance),freeRefill:true})}
async function spin(req,env,p){let x;try{x=await body(req)}catch(e){return bad('Invalid round request')};
if(typeof x.requestId!=='string'||!/^[a-f0-9-]{36}$/.test(x.requestId))return bad('Invalid round request ID');
const previous=await env.DB.prepare('SELECT * FROM rounds WHERE player_id=? AND request_id=?').bind(p.id,x.requestId).first();
if(previous)return json({ok:true,round:mapRound(previous),replayed:true});
if(x.mode!=='slots'&&x.mode!=='roulette')return bad('Unknown game');
let stake=0,result,payout=0,bets=[];
if(x.mode==='slots'){
if(!Number.isSafeInteger(x.stake)||!CHIPS.has(x.stake)||x.stake>100000)return bad('Choose a valid free practice stake');
stake=x.stake;
const symbols=[drawInt(6),drawInt(6),drawInt(6)];result={symbols};payout=payoutSlot(symbols,stake);
}else{
if(!Array.isArray(x.bets)||x.bets.length<1||x.bets.length>20||!x.bets.every(validBet))return bad('Choose 1–20 valid roulette bets');
bets=x.bets.map(b=>({type:b.type,...(b.type==='number'?{value:b.value}:{}),amount:b.amount}));
stake=bets.reduce((sum,b)=>sum+b.amount,0);if(stake>500000)return bad('Maximum total stake is 500K free practice points');
const number=drawInt(37);result={number,color:number===0?'green':RED.has(number)?'red':'black'};
payout=bets.reduce((sum,b)=>sum+b.amount*rouletteMultiplier(number,b),0);
}
if(stake<=0||payout>MAX_BAL)return bad('Stake/payout limit exceeded');
const rid=crypto.randomUUID(),out=JSON.stringify(result),listed=JSON.stringify(bets);
const statements=[
env.DB.prepare('UPDATE players SET balance=balance-?+?, last_seen_at=CURRENT_TIMESTAMP WHERE id=? AND balance>=? AND balance-?+?<=? AND NOT EXISTS (SELECT 1 FROM rounds WHERE player_id=? AND request_id=?)').bind(stake,payout,p.id,stake,stake,payout,MAX_BAL,p.id,x.requestId),
env.DB.prepare('INSERT INTO rounds(id,player_id,request_id,mode,stake,payout,result_json,bets_json,balance_after) SELECT ?,?,?,?,?,?,?,?,balance FROM players WHERE id=? AND changes()=1').bind(rid,p.id,x.requestId,x.mode,stake,payout,out,listed,p.id),
env.DB.prepare('SELECT * FROM rounds WHERE player_id=? AND request_id=?').bind(p.id,x.requestId)
];
const resultSet=await env.DB.batch(statements);const saved=resultSet[2]?.results?.[0];
if(!saved)return bad('Not enough free practice points, or another round already processed. Refresh your balance.',409);
return json({ok:true,round:mapRound(saved),wallet:'FREE_PRACTICE_ONLY'})}
async function leaderboard(env){const results=await env.DB.batch([
env.DB.prepare("SELECT COUNT(*) AS recent_players FROM players WHERE last_seen_at>datetime('now','-15 minutes')"),
env.DB.prepare("SELECT p.name,MAX(r.payout-r.stake) AS best_win,COUNT(r.id) AS winning_rounds FROM rounds r JOIN players p ON p.id=r.player_id WHERE r.payout>r.stake GROUP BY p.id ORDER BY best_win DESC, winning_rounds DESC LIMIT 10")
]);return json({ok:true,activeLast15m:Number(results[0]?.results?.[0]?.recent_players||0),leaders:(results[1]?.results||[]).map(x=>({name:x.name,bestWin:Number(x.best_win),winningRounds:Number(x.winning_rounds)})),label:'Free-practice leaderboard only. No prizes.'})}
export default {async fetch(req,env){
const path=new URL(req.url).pathname;if(req.method==='OPTIONS')return new Response(null,{status:204,headers:cors()});
if(path==='/health')return json({ok:true,mode:'free-practice',serverOutcomes:true,sharedAccounts:true,database:'D1'});
if(!path.startsWith('/api/'))return bad('Not found',404);
if(req.method==='GET'&&path==='/api/leaderboard'){try{return await leaderboard(env)}catch(e){console.error('Leaderboard',e);return bad('Leaderboard unavailable',503)}}
if(req.method==='POST'&&path==='/api/guest'){try{return await guest(req,env)}catch(e){console.error('Guest',e);return bad('Could not create guest',503)}}
let p;try{p=await auth(req,env)}catch(e){console.error('Auth',e);return bad('Unable to verify guest',503)}
if(!p)return bad('Guest session expired. Please join again.',401);
try{if(req.method==='GET'&&path==='/api/me')return await getMe(req,env,p);
if(req.method==='POST'&&path==='/api/spin')return await spin(req,env,p);
if(req.method==='POST'&&path==='/api/refill')return await refill(env,p);
return bad('Not found',404)}catch(e){console.error('Game operation',e);return bad('Server error. Your request can be retried with the same round ID.',503)}
}};
