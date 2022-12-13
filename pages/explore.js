import ImageDisplay from "../components/imageDisplay";
import { useEffect, useState } from "react";
import styles from '../styles/explore.module.css';
import useMediaQuery from '../src/hooks/mediaQuery';
import { searchClient } from '../src/config/firebase.config';
import { InstantSearch, SearchBox, Hits, Pagination, Highlight, Configure } from 'react-instantsearch-dom';
import Toggle from "../components/toggle";
import { getFirestore, doc, getDoc, collection } from "firebase/firestore";
import useAuth from "../src/auth/authContext";

// import sample_images from '../public/images';
// import Search from "../components/search";

export default function Explore () {
    // const IMG = 'https://storage.googleapis.com/vidiths_test_bucket/51b14540-fd31-4a29-964e-425c0c54acdd.png'
    const [mine, setMine] = useState(false);
    const [images, setImages] = useState([]);
    const tooShort = useMediaQuery('(max-height: 650px)');
    const notWideEnough = useMediaQuery('(max-width: 1100px)');
    const smallScreen = useMediaQuery('(max-width: 700px)');
    const numImages = 4-(2*(tooShort||notWideEnough))-(1*smallScreen)
    const firestore = getFirestore();
    const { user } = useAuth();
    
    useEffect(() => {
        async function getImages() {
            const images = []
            const docRef = doc(firestore, 'users', user.uid)
            const docPromise = await getDoc(docRef)
            const userData = docPromise.data()
            console.log(userData)
            const userImages = userData.images
            console.log(userImages)
            console.log()
            for (const image of userImages) {
                const imageRef = doc(firestore, 'images', image)
                const imageData = await getDoc(imageRef)
                images.push(imageData.data())
            }
            return images
        };
        setImages(getImages());
        console.log(images);
    }, [user])

    return (
        <main className={styles.main}>
            <Toggle setState={setMine} state={mine} state1Name={'Mine'} state2Name={'Public'} />
            {mine
                ? (
                    <div className={styles.imagesContainer}>
                        {
                            images.slice(0,numImages).map((image, index) => (
                                <ImageDisplay key={index} hit={{url: image.url, prompt: image.prompt}} smallScreen={smallScreen} />
                            ))
                        }
                    </div>
                )
                : (
                    <InstantSearch
                        searchClient={searchClient}
                        indexName={'images'}
                    >
                        <Configure hitsPerPage={numImages} />
                        <SearchBox 
                            translations={{ placeholder: 'Search for Images' }}
                        />
                        <Hits hitComponent={ImageDisplay} />
                    </InstantSearch>
                )
            }
        </main>
    )
}

// export async function getStaticProps() {
//     const firestore = getFirestore();
    

//     return {
//         props: {
//             images
//         }
//     }
// }