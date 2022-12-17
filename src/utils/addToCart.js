import { collection, getDoc } from "firebase/firestore";

export default async function addToCart(firestore, user, image, prompt) {
    // const cartRef = firestore.collection('users').doc(user.uid).collection('cart')
    const cartRef = collection(firestore, 'users', user.uid, 'cart')
    // Add the image as a new document in the cart collection with a random id
    const docRef = await cartRef.add({
        prompt: prompt,
        image: image,
        // Add firestore server timestamp
        created_at: firestore.FieldValue.serverTimestamp()
    })
}