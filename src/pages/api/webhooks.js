import getRawBody from "raw-body";
import { stripe } from "src/pricing/utils/stripe";

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

  try {
    switch (event.type) {
      case "customer.subscription":
        console.log("subscription");
    }
  } catch (error) {
    console.log(error.message);
    res.send({succes: false});

  }

  res.send({success: true})

};
