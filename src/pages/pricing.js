import {stripe} from "src/pricing/utils/stripe";

export default function PricingPage({plans}) {
  console.log(plans)
  return (
    <div>Pricings</div>
  )
}

export async function getStaticProps() {
  const {data: prices} = await stripe.prices.list()
  const plans = []

  for (const price of prices) {
    const product = await stripe.products.retrieve(price.product)
    plans.push({
      name: product.name,
      id: price.id,
      price: price.unit_amount / 100,
      interval: price.recurring.interval

    });
  }

  return {
    props: {
      plans,
    }
  }
}