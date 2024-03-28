import { stripe } from "src/pricing/utils/stripe";
import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/utils";

export async function GET(req: NextRequest, {params}: { params: { priceId: string } }) {
  const priceId = params.priceId

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{price: priceId, quantity: 1}],
    success_url: `${SITE_URL}/success`,
    cancel_url: `${SITE_URL}/pricing`,
  });

  return NextResponse.json({id: session.id});
};
