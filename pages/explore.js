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

import sample_images from '../public/images';
// import Search from "../components/search";

export default function Explore () {
    // const IMG = 'https://storage.googleapis.com/vidiths_test_bucket/51b14540-fd31-4a29-964e-425c0c54acdd.png'
    const [mine, setMine] = useState(false);
    const [loading, setLoading] = useState(true)
    const [images, setImages] = useState([]);
    const tooShort = useMediaQuery('(max-height: 650px)');
    const notWideEnough = useMediaQuery('(max-width: 1100px)');
    const smallScreen = useMediaQuery('(max-width: 700px)');
    const numImages = 4-(2*(tooShort||notWideEnough))-(1*smallScreen)
    const firestore = getFirestore();
    const { user } = useAuth();

    const prompts = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    ]
    
    useEffect(() => {
        const images = [0,1,2,3].map((i) => {
            return {
                url: sample_images[i],
                prompt: prompts[i]
            }
        })
        setImages(images)
        setLoading(false);
    }, [])

    
    // useEffect(() => {
    //     async function getImages() {
    //         const userImageObjects = []
    //         const docRef = doc(firestore, 'users', user.uid)
    //         const docPromise = await getDoc(docRef)
    //         const userData = docPromise.data()
    //         const userImages = userData.images
    //         for (const image of userImages) {
    //             const imageRef = doc(firestore, 'images', image)
    //             const imageData = await getDoc(imageRef)
    //             userImageObjects.push(imageData.data())
    //         }
    //         return userImageObjects;
    //     };
    //     getImages().then((userImageObjects) => {
    //         setImages(userImageObjects)
    //         console.log(userImageObjects)
    //         console.log(images)
    //         setLoading(false)
    //     })
    // }, [user])

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

// export async function getStaticProps() {
//     const firestore = getFirestore();
    

//     return {
//         props: {
//             images
//         }
//     }
// }