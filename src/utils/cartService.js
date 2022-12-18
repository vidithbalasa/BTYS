import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

export async function addToCart(firestore, user, imageId) {
    const cartRef = collection(firestore, 'users', user.uid, 'cart')
    const imageRef = doc(firestore, 'images', imageId)
    const docRef = await addDoc(cartRef, {
        image: imageRef, size: '45740', quantity: 1
    })
}

export async function updateCartItem (firestore, user, cartItemId, update) {
    const cartRef = doc(firestore, 'users', user.uid, 'cart', cartItemId)
    const docRef = await updateDoc(cartRef, update)
}

// // create a function that spits out a function that lets you change the values 
    // // for a specific cart item
    // const changeCartItem = (index) => {
    //     return (index, quantity, size) => {
    //         // update the cart item in firestore
    //         const colDoc = document(firestore, 'users', user.uid, 'cart', cartItems[index].id);
    //         const update = {
    //             quantity: quantity,
    //             size: size,
    //         }
    //         // update the cart item in state
    //     }
    // }