import React, { useEffect, useState } from 'react';
import useAuth from '../src/auth/authContext';
import { getFirestore, collection, getDocs, doc } from 'firebase/firestore';
// import '../styles/portfolio.module.css';
import { withProtected } from '../src/auth/route';
import Image from 'next/image';
import Link from 'next/link';

const Portfolio = () => {
    const [images, setImages] = useState({});
    const auth = useAuth();

    useEffect(() => {
        async function getImages() {
            const db = getFirestore();
            // Collection 'users' -> Document 'auth.user.uid' -> Collection 'images'
            const imagesRef = collection(db, 'users', auth.user.uid, 'images');
            const catalog = await getDocs(imagesRef);
            // Get the "url" field from each document and add it to the images array
            catalog.forEach((doc) => {
                // Map each image id to its data
                setImages((images) => ({
                    ...images,
                    [doc.id]: doc.data(),
                }));
            });
        }
        getImages();
    }, [auth.user]);

    return (
        <main>
            <h1 className='title'>Portfolio</h1>
            <div className='portfolio'>
                {
                    // Show each image with a link to /portfolio/[id]
                    Object.keys(images).map((id) => (
                        <Link href={`/portfolio/${id}`} key={id}>
                            <a>
                                <Image
                                    src={images[id].url}
                                    alt='Portfolio image'
                                    width={300}
                                    height={300}
                                />
                            </a>
                            {/* Add a caption (the prompt) */}
                            <p className='imageCaption'>{images[id].prompt}</p>
                        </Link>
                    ))
                }
            </div>
            {/* <div>
                <button onClick={() => console.log(images)}>Log Images</button>
            </div> */}
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