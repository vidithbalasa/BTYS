import { collection, addDoc, onSnapshot, doc, setDoc } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";

export default async function createSession (firestore, user, line_items, additionalData, setLoading) {
    const checkout_session_ref = collection(firestore, 'users', user.uid, 'checkout_sessions')

    const docRef = await addDoc(checkout_session_ref, {
        mode: 'payment',
        success_url: 'https://btys.vercel.app/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: window.location.origin,
        shipping_address_collection: {"allowed_countries": ["US"]},
        shipping_options: [{shipping_rate: "shr_1MGrdnKnHHz9C6fwaktLyliA"}],
        line_items,
        ...additionalData,
    })

    // shipping_options: [
    //     {"shipping_rate_data": {
    //         "type": "fixed_amount",
    //         "fixed_amount": {"amount": 0, "currency": "usd"},
    //         "display_name": "Free shipping",
    //         "delivery_estimate": {
    //             "minimum": {"unit": "business_day", "value": 5},
    //             "maximum": {"unit": "business_day", "value": 7},
    //         }
    //     }}
    // ],
    
    onSnapshot(docRef, async (snap) => {
        const { error, sessionId } = snap.data();
        if (error) {
            alert(error.message)
        }
        if (sessionId) {
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
            stripe.redirectToCheckout({ sessionId })
            setLoading(false)
        }
    })
}