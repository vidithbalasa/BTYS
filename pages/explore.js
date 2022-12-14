import ImageDisplay from "../components/imageDisplay";
import { useEffect, useState } from "react";
import styles from '../styles/explore.module.css';
import globalStyles from '../styles/global.module.css';
import useMediaQuery from '../src/hooks/mediaQuery';
import { searchClient } from '../src/config/firebase.config';
import { InstantSearch, SearchBox, Hits, Pagination, Highlight, Configure } from 'react-instantsearch-dom';
import Toggle from "../components/toggle";
import { getFirestore, doc, getDoc, collection } from "firebase/firestore";
import useAuth from "../src/auth/authContext";

export default function Explore () {
    const [mine, setMine] = useState(false);
    const [loading, setLoading] = useState(true)
    const [images, setImages] = useState([]);
    const tooShort = useMediaQuery('(max-height: 650px)');
    const notWideEnough = useMediaQuery('(max-width: 1100px)');
    const smallScreen = useMediaQuery('(max-width: 700px)');
    const firestore = getFirestore();
    const numImages = 4-(2*(tooShort||notWideEnough))-(1*smallScreen)
    const { user } = useAuth();
    
    useEffect(() => {
        async function getImages() {
            const userImageObjects = []
            const docRef = doc(firestore, 'users', user.uid)
            const docPromise = await getDoc(docRef)
            const userData = docPromise.data()
            const userImages = userData.images
            for (const image of userImages) {
                const imageRef = doc(firestore, 'images', image)
                const imageData = await getDoc(imageRef)
                userImageObjects.push(imageData.data())
            }
            return userImageObjects;
        };
        // getImages().then((userImageObjects) => {
        //     setImages(userImageObjects)
        //     console.log(userImageObjects)
        //     console.log(images)
        //     setLoading(false)
        // })
    }, [user])

    return (
        <main className={styles.main}>
            <Toggle setState={setMine} state={mine} state1Name={'Mine'} state2Name={'Public'} />
            {mine
                ? (
                    <div className={styles.imagesBox}>
                        <div className={styles.imagesContainer}>
                            {!loading &&
                                images.slice(0,numImages).map((image, index) => (
                                    <ImageDisplay key={index} hit={{url: image.url, prompt: image.prompt}} smallScreen={smallScreen} />
                                    ))
                                }
                        </div>
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