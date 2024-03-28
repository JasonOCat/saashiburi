"use client";

import {useState} from "react";
import {SITE_URL} from "@/utils";
import {loadStripe} from "@stripe/stripe-js";

export default function Plans({plans}) {
  const [selectedPlan, setSelectPlan] = useState("month");
  const [isRedirecting, setRedirecting] = useState(false);
  const plan = plans.find((plan) => plan.interval === selectedPlan);

  function togglePlan() {
    const interval = selectedPlan === 'month' ? 'year' : 'month';
    setSelectPlan(interval)
  }

  async function onCheckout() {
    setRedirecting(true);
    const response = await fetch(`${SITE_URL}/api/checkout/${plan.id}`);
    const data = await response.json();
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    await stripe.redirectToCheckout({ sessionId: data.id} );
    setRedirecting(false);
  }

  return (
    <div className="bg-salmon border-right">
      <div className="column-padding centered">
        <div className="callout-wrap">
          <div className="plan">
            <div className="plan-wrap">
              <div className="plan-content">
                <div className="plan-switch">
                  Monthly
                  <label className="switch">
                    <input
                      onChange={togglePlan}
                      type="checkbox"
                    />
                    <span className="slider"/>
                  </label>
                  Yearly
                </div>
                <h2 className="plan-name">{plan.name}</h2>
                <div>
                  Just ${plan.price} / {plan.interval}
                </div>
                <div>
                  <button disabled={isRedirecting} onClick={onCheckout} className="large-button">
                    <div className="large-button-text">{isRedirecting ? "Loading..." : "Buy Now"}</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
