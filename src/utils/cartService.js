import { collection, addDoc, doc, updateDoc, getDocs, getDoc } from "firebase/firestore";
import stickerVariants from "./stickerVariants";

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

export async function getCartSessionInfo(firestore, user) {
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
    return { line_items, metadata }
}