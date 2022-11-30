import React, { useEffect, useState } from 'react';
import useAuth from '../src/auth/authContext';
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore';
import '../styles/portfolio.module.css';
import { withProtected } from '../src/auth/route';
import { Image } from 'next/image';

const Portfolio = () => {
    const [images, setImages] = useState([]);
    const auth = useAuth();

    useEffect(() => {
        getCatalog();
    }, [auth.user, getCatalog]);

    const getCatalog = async () => {
        const db = getFirestore();
        // Collection 'users' -> Document 'auth.user.uid' -> Collection 'images'
        const imagesRef = collection(db, 'users', auth.user.uid, 'images');
        const catalog = await getDocs(imagesRef);
        // Get the "url" field from each document and add it to the images array
        catalog.forEach((doc) => {
            setImages((imgs) => [...imgs, doc.data()]);
        });
    }

    return (
        <main>
            <h1 className='title'>Portfolio</h1>
            <div className='portfolio'>
                {
                    images.map((image, index) => {
                        // image that links to /portfolio/[id] where id is the document name
                        return (
                            <div key={index}>
                                <a href={`/portfolio/${image.id}`}>
                                    <Image src={image.url} alt='Generated Image' />
                                </a>
                            </div>
                        );
                    })
                }
            </div>
        </main>
    );
}

export default withProtected(Portfolio);

// export async function getStaticProps() {
//     const db = getFirestore();
//     // Collection 'users' -> Document auth.user.uid -> Collection 'images'
//     // const imagesRef = collection(db, 'users').doc(auth.user.uid).collection('images');
//     const userDoc = doc(db, 'users', auth.user.uid)
//     const catalog = await getDocs(imagesRef);
//     // Return the images
//     return {
//         props: {
//             images: catalog.docs,
//         }
//     };
// }