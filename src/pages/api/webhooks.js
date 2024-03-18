import getRawBody from "raw-body";
import {stripe} from "src/pricing/utils/stripe";
import {supabase} from "../../../supabase";

//Strip doc on webhooks : https://docs.stripe.com/webhooks
// to get the buffer correctly using raw-body
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const signature = req.headers['stripe-signature'];
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;

  let event;
  try {
    //to have a buffer
    const rawBody = await getRawBody(req, { limit: "2mb"});
    event = stripe.webhooks.constructEvent(rawBody, signature, signingSecret);

  } catch (error) {
    console.log("Webhook signature verification failed.")
    return res.status(400).end();
  }

  // Types of Stripe Event https://docs.stripe.com/api/events/object
  try {
    switch (event.type) {
      case "customer.subscription.updated":
        await updateSubscription(event);
        break;

      case "customer.subscription.deleted":
        await deleteSubscription(event);
        break;

    }
  } catch (error) {
    console.log(error.message);
    res.send({success: false});

  }

  res.send({success: true})

};

async function updateSubscription(event){
  const subscription = event.data.object
  const stripe_customer_id = subscription.customer;
  const subscription_status = subscription.status;
  const price = subscription.items.data[0].price.id;

  const { data: profile } = await supabase.from('profile')
    .select('*')
    .eq('stripe_customer_id', stripe_customer_id)
    .single();

  if (profile) {
    // doc supabase to update profile https://supabase.com/dashboard/project/vtjajvdcirctoxlzhoei/api?resource=profile
    const updatedSubscription = {
      subscription_status,
      price
    }
    await supabase
      .from('profile')
      .update(updatedSubscription)
      .eq('stripe_customer_id', stripe_customer_id)
  } else {
    // doc stripe retrieve customer  https://docs.stripe.com/api/customers/retrieve
    const customer = await stripe.customers.retrieve(stripe_customer_id);
    const name = customer.name;
    const email = customer.email
    const newProfile = {
      name,
      email,
      stripe_customer_id,
      subscription_status,
      price,
    }

    // doc supabase to create server-side auth client : https://supabase.com/docs/reference/javascript/admin-api/admin-api
    await supabase.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: newProfile
    });
  }
}

async function deleteSubscription(event){

}
