import { createServerSupabaseClient} from "@supabase/auth-helpers-nextjs";
import {stripe} from "src/pricing/utils/stripe";
import {SITE_URL} from "src/core/utils/index.js.old";

// deprecated doc supabase server client https://supabase.com/docs/guides/auth/auth-helpers/nextjs-pages?migration-side=before#deprecated-functions
export default async function handler(req, res) {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  });
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  if (!user) {
    return res.Status(401).send('Unauthorized');
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
    customer: profile.stripe_customer_id,
    return_url: SITE_URL,
  });

  res.send({url: session.url});

}
