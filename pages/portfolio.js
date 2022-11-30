import React, { useEffect, useState } from 'react';
import useAuth from '../src/auth/authContext';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export default function Portfolio() {
    const [images, setImages] = useState([]);
    const auth = useAuth();

    useEffect(() => {
        getCatalog();
    }, []);

    const getCatalog = async () => {
        const db = getFirestore();
        // Collection 'users' -> Document 'auth.user.uid' -> Collection 'images'
        const imagesRef = collection(db, 'users', auth.user.uid, 'images');
        const catalog = await getDocs(imagesRef);
        // Get the "url" field from each document and add it to the images array
        catalog.forEach((doc) => {
            setImages((imgs) => [...imgs, doc.data().url]);
        });
    }

    return (
        <main>
            <h1>Portfolio</h1>
            {
                images.map((imageUrl, index) => {
                    return (
                        <div key={index}>
                            <img src={imageUrl} alt='Generated Image' />
                        </div>
                    );
                })
            }
        </main>
    );
}