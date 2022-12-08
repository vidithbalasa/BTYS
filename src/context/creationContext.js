import { createContext, useState } from 'react';

// Context should hold an image object and a product object
const creationContext = createContext({ image: null, product: null });
export default creationContext;

export function CreationProvider(props) {
    const image = JSON.parse(localStorage.getItem('image'));
    const product = JSON.parse(localStorage.getItem('product'));

    const addImage = (newImage) => {
        localStorage.setItem('image', JSON.stringify(newImage));
    }

    const addProduct = (newProduct) => {
        localStorage.setItem('product', JSON.stringify(newProduct));
    }

    const value = { image, product, addImage, addProduct };
    return <creationContext.Provider value={value} {...props} />;
}