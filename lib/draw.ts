export type DrawCandidate={userId:string;scores:number[]};
export type DrawResult={userId:string;matchedNumbers:number;ticket:number[];drawnNumbers:number[]};
export type DrawSimulation={drawnNumbers:number[];results:DrawResult[];tiers:{five:DrawResult[];four:DrawResult[];three:DrawResult[]};pools:{five:number;four:number;three:number}};
const clamp=(n:number,min:number,max:number)=>Math.min(max,Math.max(min,n));
function hashSeed(seed:string){let h=2166136261;for(const c of seed){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed:string){let state=hashSeed(seed)||1;return()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296}}
export function normalizedNumbers(scores:number[]){return [...new Set(scores.slice(0,5).map(s=>clamp(Math.round(s),1,45)))].sort((a,b)=>a-b)}
export function frequency(candidates:DrawCandidate[]){const freq=Array.from({length:45},()=>0);for(const c of candidates)for(const s of normalizedNumbers(c.scores))freq[s-1]+=1;return freq}
function sampleUnique(weighted:number[],count:number,seed:string){const random=rng(seed);const pool=weighted.map((weight,index)=>({index:index+1,weight:Math.max(0.1,weight)}));const chosen:number[]=[];while(chosen.length<count&&pool.length){const total=pool.reduce((s,x)=>s+x.weight,0);let pick=random()*total;let at=0;for(;at<pool.length;at++){pick-=pool[at].weight;if(pick<=0)break}const selected=pool.splice(Math.min(at,pool.length-1),1)[0];chosen.push(selected.index)}return chosen.sort((a,b)=>a-b)}
export function generateRandomNumbers(seed:string){const weights=Array.from({length:45},()=>1);return sampleUnique(weights,5,seed)}
export function generateAlgorithmicNumbers(candidates:DrawCandidate[],seed:string){return sampleUnique(frequency(candidates).map(x=>x+1),5,seed)}
export function simulateDraw(candidates:DrawCandidate[],month:string,mode:"random"|"algorithmic"="random",subscriptionRevenue:number=0,jackpotRollover:number=0):DrawSimulation{
  const drawnNumbers=mode==="algorithmic"?generateAlgorithmicNumbers(candidates,month+"|algorithmic"):generateRandomNumbers(month+"|random");
  const results=candidates.map(c=>{const ticket=normalizedNumbers(c.scores);const matchedNumbers=ticket.filter(n=>drawnNumbers.includes(n)).length;return {userId:c.userId,matchedNumbers,ticket,drawnNumbers}}).filter(x=>x.matchedNumbers>=3).sort((a,b)=>b.matchedNumbers-a.matchedNumbers);
  const pools=calculatePrizePools(subscriptionRevenue,jackpotRollover);
  const tiers={five:results.filter(x=>x.matchedNumbers===5),four:results.filter(x=>x.matchedNumbers===4),three:results.filter(x=>x.matchedNumbers===3)};
  return {drawnNumbers,results,tiers,pools};
}
export function calculatePrizePools(subscriptionRevenue:number,jackpotRollover=0){const safe=Math.max(0,subscriptionRevenue);return {five:Number((safe*.4+Math.max(0,jackpotRollover)).toFixed(2)),four:Number((safe*.35).toFixed(2)),three:Number((safe*.25).toFixed(2))}}
export function splitPrize(pool:number,winners:number){return winners>0?Number((pool/winners).toFixed(2)):0}
export function planMonthlyRevenue(plan:"monthly"|"yearly"){return plan==="yearly"?10:12}
