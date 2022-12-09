import { useContext } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import useAuth from "../src/auth/authContext";
import stripeContext from "../src/stripe/stripeContext";
import globalStyles from '../styles/global.module.css'
import { withProtected } from "../src/auth/route";

function Checkout() {
    /* DEV */
    const success_url = 'http://localhost:3000/success';
    const cancel_url = 'http://localhost:3000/cancel';

    /* PROD */
    // const success_url = 'https://btys.vercel.app/success';
    // const cancel_url = 'https://btys.vercel.app/cancel';

    // Checkout with stripe
    const firestore = getFirestore();
    const { user } = useAuth();
    const stripe = useContext(stripeContext);

    const createSession = async () => {
        const checkout_session_ref = collection(firestore, 'users', user.uid, 'checkout_sessions')

        const session_promise = await addDoc(checkout_session_ref, {
            mode: 'payment',
            success_url: success_url,
            cancel_url: cancel_url,
            line_items: [{
                price_data: {currency: 'usd', product_data: {name: 'testing'}, unit_amound: 10000},
                quantity: 1
            }]
        })

        // When session_promise doc is updated, get the session_id
        session_promise.onSnapshot(async (snap) => {
            const { session_id } = snap.data();
            if (session_id) {
                await stripe.redirectToCheckout({sessionId: session_id})
            }
        })  
    }

    return (
        <main className={globalStyles.main}>
            <h1 className={globalStyles.title}>Checkout</h1>
            <button onClick={createSession}>Create Session</button>
        </main>
    )
}

export default withProtected(Checkout);