import { collection, addDoc } from "firebase/firestore";

export default async function addToCart(firestore, user, image, prompt) {
    // const cartRef = firestore.collection('users').doc(user.uid).collection('cart')
    const cartRef = collection(firestore, 'users', user.uid, 'cart')
    // Add the image as a new document in the cart collection with a random id
    // add prompt, image, size (2x2 default), and quantity (1 default) to the cart as a new document
    const docRef = await addDoc(cartRef, {
        prompt,
        image,
        size: '2x2',
        quantity: 1
    })
}