import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useAuth from '../../src/auth/authContext';
import Image from 'next/image';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function Artwork({ catalog }) {
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
            <button onClick={() => console.log(catalog)}>Back</button>
        </main>
    );
}

export function getStaticProps() {
    async function getCatalog() {
        // Get catalog of items from printify and display it on the page
        const printify_base_url = "https://api.printify.com";
        const printify_api_key = process.env.PRINTIFY_API_KEY;
        const printify_catalog_url = `${printify_base_url}/v1/catalog/blueprints.json`;
        const printify_headers = {
            "Authorization": printify_api_key
        };
        const printify_response = await fetch(printify_catalog_url, {
            method: 'GET',
            headers: printify_headers
        });
        const printify_data = await printify_response.json();
        const printify_catalog = printify_data.blueprints;
        return printify_catalog;
    }
    return {
        props: {
            catalog: getCatalog(),
        },
    };
}