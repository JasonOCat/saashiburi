import {stripe} from "@/src/pricing/utils/stripe";
import Plans from "@/app/ui/pricing/plans";
import Benefits from "@/app/ui/pricing/benefits";


export default async function PricingPage() {
  const {data: prices } = await stripe.prices.list()
  const plans : any[] = []

  for (const price of prices) {
    const product = await stripe.products.retrieve(price.product as string)

    if (!price?.unit_amount) {
      throw new Error(`Unit amount is null or undefined for product ${product.name}`);
    }

    if (!price?.recurring?.interval) {
      throw new Error(`Recurring interval is null or undefined for product ${product.name}`);
    }

    plans.push({
      name: product.name,
      id: price.id,
      price: price.unit_amount / 100,
      interval: price.recurring.interval
    });


  }


  return (
    <div className="grid-halves h-screen-navbar">
      <Plans plans={plans} />
      <Benefits />
    </div>
  )
}