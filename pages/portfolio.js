import React, { useEffect, useState } from 'react';
import useAuth from '../src/auth/authContext';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import '../styles/portfolio.css';

export default function Portfolio({ images }) {
    // const [images, setImages] = useState([]);
    const auth = useAuth();

    // useEffect(() => {
    //     getCatalog();
    // }, []);

    // const getCatalog = async () => {
    //     const db = getFirestore();
    //     // Collection 'users' -> Document 'auth.user.uid' -> Collection 'images'
    //     const imagesRef = collection(db, 'users', auth.user.uid, 'images');
    //     const catalog = await getDocs(imagesRef);
    //     // Get the "url" field from each document and add it to the images array
    //     catalog.forEach((doc) => {
    //         setImages((imgs) => [...imgs, doc.data().url]);
    //     });
    // }

    return (
        <main>
            <h1 className='title'>Portfolio</h1>
            <div className='portfolio'>
                {
                    images.map((doc, index) => {
                        return (
                            <div key={index}>
                                <img src={doc.data().url} alt='Generated Image' />
                            </div>
                        );
                    })
                }
            </div>
        </main>
    );
}

export async function getStaticProps() {
    const db = getFirestore();
    // Collection 'users' -> Document 'auth.user.uid' -> Collection 'images'
    const imagesRef = collection(db, 'users', auth.user.uid, 'images');
    const catalog = await getDocs(imagesRef);
    // Return the images
    return {
        props: {
            images: catalog.docs,
        }
    };
}