import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useAuth from '../../src/auth/authContext';
import Image from 'next/image';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function Artwork() {
    const [image, setImage] = useState({});
    const router = useRouter();
    const { id } = router.query;
    const auth = useAuth();

    useEffect(() => {
        async function getImage() {
            const db = getFirestore();
            // Collection 'users' -> Document auth.user.uid -> Collection 'images' -> Document id
            const imageRef = doc(db, 'users', auth.user.uid, 'images', id);
            const docSnap = await getDoc(imageRef);
            if (docSnap.exists()) {
                setImage(docSnap.data());
            } else {
                // If the image doesn't exist, redirect to /portfolio
                router.push('/portfolio');
            }
        }
        getImage();
    }, [id]);

    // useEffect(() => {
    //     setImage({
    //         url: 'https://storage.googleapis.com/vidiths_test_bucket/51b14540-fd31-4a29-964e-425c0c54acdd.png',
    //         prompt: 'This is a test image',
    //     });
    // })
    
    return (
        <main>
            <h1>Artwork</h1>
            {image && 
                <div>
                    <Image
                        src={image.url}
                        alt={image.prompt}
                        width={512}
                        height={512}
                    />
                    <p>{image.prompt}</p>
                </div>    
            }
            <button onClick={e => console.log(image)}>Log image</button>
        </main>
    );
}