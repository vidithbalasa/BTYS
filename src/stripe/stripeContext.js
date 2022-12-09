import { createContext, useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
// import Stripe from 'stripe';

const stripeContext = createContext({ stripe: null });
export default stripeContext;

export function StripeProvider(props) {
    const [stripe, setStripe] = useState(null);

    useEffect(() => {
        const load = async () => {
            await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
                .then((stripe) => {
                    setStripe(stripe);
                })
                .catch((error) => {
                    console.log(error);
                }
            );
        }
        load();
    }, []);

    // const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

    const value = { stripe };
    return <stripeContext.Provider value={value} {...props} />;
}