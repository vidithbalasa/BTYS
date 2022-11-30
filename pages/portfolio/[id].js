import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuth from '../../src/auth/authContext';

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
    
    return (
        <main>
            <h1>Artwork</h1>
            <Image
                src={image.url}
                alt={image.prompt}
                width={512}
                height={512}
            />
            <p>{image.prompt}</p>
        </main>
    );
}