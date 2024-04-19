import { createSupabaseServerClient } from "@/utils/supabase/server";
import { stripe } from "@/utils/stripe/stripe";
import { SITE_URL } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

// deprecated doc supabase server client https://supabase.com/docs/guides/auth/auth-helpers/nextjs-pages?migration-side=before#deprecated-functions
export async function GET(req: NextRequest) {

  const supabaseServerClient = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  if (!user) {
    return NextResponse.json({message: 'Auth required'}, {status: 401});
  }

  const { data: profile } = await supabaseServerClient
    .from('profile')
    .select('stripe_customer_id')
    .eq('user_id', user.id)
    .single();


  // doc stripe integrate customer portal : https://docs.stripe.com/customer-management/integrate-customer-portal
  //  StripeInvalidRequestError: You can’t create a portal session in test mode until you save your customer portal settings in test mode at https://dashboard.stripe.com/test/settings/billing/portal.
  // to manage the billing page : https://dashboard.stripe.com/test/settings/billing/portal
  const session = await stripe.billingPortal.sessions.create({
    customer: profile?.stripe_customer_id,
    return_url: SITE_URL,
  });
  return NextResponse.json({url: session.url});

}
