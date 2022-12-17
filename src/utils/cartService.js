import { collection, addDoc, doc } from "firebase/firestore";

export async function addToCart(firestore, user, imageId) {
    const cartRef = collection(firestore, 'users', user.uid, 'cart')
    const imageRef = doc(firestore, 'images', imageId)
    const docRef = await addDoc(cartRef, {
        image: imageRef, size: '2"x2"', quantity: 1
    })
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