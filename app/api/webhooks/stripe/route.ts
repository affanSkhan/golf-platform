import {NextResponse} from "next/server";import Stripe from "stripe";import {getSupabaseServer} from "../../../../lib/supabase/server";
function renewalDate(ts:number|undefined){return ts?new Date(ts*1000).toISOString().slice(0,10):null}
export async function POST(req:Request){
 const secret=process.env.STRIPE_SECRET_KEY;const webhook=process.env.STRIPE_WEBHOOK_SECRET;if(!secret||!webhook)return NextResponse.json({error:"webhook_not_configured"},{status:503});
 const signature=req.headers.get("stripe-signature");if(!signature)return NextResponse.json({error:"missing_signature"},{status:400});
 const body=await req.text();const stripe=new Stripe(secret);let event:Stripe.Event;try{event=stripe.webhooks.constructEvent(body,signature,webhook)}catch{return NextResponse.json({error:"invalid_signature"},{status:400})}
 const supabase=await getSupabaseServer();if(!supabase)return NextResponse.json({error:"database_not_configured"},{status:503});
 try{
   if(event.type==="checkout.session.completed"){
     const session=event.data.object as Stripe.Checkout.Session;const userId=session.metadata?.user_id;const plan=session.metadata?.plan;
     if(userId&&plan){await supabase.from("subscriptions").upsert({user_id:userId,plan,status:"active",stripe_customer_id:typeof session.customer==="string"?session.customer:null,stripe_subscription_id:typeof session.subscription==="string"?session.subscription:null},{onConflict:"user_id"})}
   }
   if(event.type==="customer.subscription.created"||event.type==="customer.subscription.updated"){
     const subscription=event.data.object as Stripe.Subscription;const status=subscription.status==="active"||subscription.status==="trialing"?"active":"inactive";
     await supabase.from("subscriptions").update({status,renewal_date:renewalDate((subscription as unknown as {current_period_end?:number}).current_period_end)}).eq("stripe_subscription_id",subscription.id)
   }
   if(event.type==="customer.subscription.deleted"){
     const subscription=event.data.object as Stripe.Subscription;await supabase.from("subscriptions").update({status:"inactive",renewal_date:null}).eq("stripe_subscription_id",subscription.id)
   }
   if(event.type==="invoice.paid"){
     const invoice=event.data.object as Stripe.Invoice;const invoiceData=invoice as unknown as {subscription?:string|Stripe.Subscription|null};const subscriptionId=typeof invoiceData.subscription==="string"?invoiceData.subscription:null;if(subscriptionId)await supabase.from("subscriptions").update({status:"active"}).eq("stripe_subscription_id",subscriptionId)
   }
 }catch(e){return NextResponse.json({error:e instanceof Error?e.message:"webhook_processing_failed"},{status:500})}
 return NextResponse.json({received:true})
}
