import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";
import { loadStripe } from "@stripe/stripe-js";
import stickerVariants from "./stickerVariants";

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

export async function createSessionFromCart(firestore, user) {
    // Get all items from cart
    const cartRef = collection(firestore, 'users', user.uid, 'cart')
    const cartItems = await getDocs(cartRef)
    // Create line items from cart items
    const line_items = []
    const metadata = {}
    let i = 0
    for (const itemDoc of cartItems.docs) {
        const item = itemDoc.data()
        const imageDoc = await getDoc(item.image)
        const image = imageDoc.data()
        const imageName = `${image.prompt} (${stickerVariants[item.size]} sticker)`
        line_items.push({
            price_data: {
                currency: 'usd',
                product_data: { name: imageName, images: [image.url] },
                unit_amount: 800,
            },
            quantity: item.quantity,
        })
        metadata[`${i}_name`] = imageName
        metadata[`${i}_image`] = image.url
    }
}