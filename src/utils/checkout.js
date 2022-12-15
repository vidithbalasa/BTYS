import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";

export default async function createSession (firestore, user, line_items, additionalData={}) {
        const checkout_session_ref = collection(firestore, 'users', user.uid, 'checkout_sessions')

        const docRef = await addDoc(checkout_session_ref, {
            mode: 'payment',
            success_url: 'https://btys.vercel.app/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: window.location.origin,
            line_items,
            ...additionalData
            // line_items: [{
            //     price_data: {currency: 'usd', product_data: {name: 'testing'}, unit_amount: 10000},
            //     quantity: 1
            // }]
        })

        onSnapshot(docRef, async (snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                console.log('error')
                alert(error.message)
            }
            if (sessionId) {
                console.log('sessionId')
                const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
                stripe.redirectToCheckout({ sessionId })
            }
        })
    }