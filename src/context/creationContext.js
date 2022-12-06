import { createContext, useState } from 'react';

// Context should hold an image object and a product object
const creationContext = createContext({ image: null, product: null });
export default creationContext;

export function CreationProvider(props) {
    const [image, setImage] = useState(null);
    const [product, setProduct] = useState(null);

    const addImage = (image) => {
        // make sure image has url, prompt, and date created
        if (image.url && image.prompt && image.dateCreated) {
            setImage(image);
        }
    }

    const addProduct = (product) => {
        // make sure product has blueprint_id, name, description, image_urls, and price
        if (product.name && product.description && product.price && product.image_urls) {
            setProduct(product);
        }
    }

    const value = { image, product, addImage, addProduct };
    return <creationContext.Provider value={value} {...props} />;
}