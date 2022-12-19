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
import LoginModal from "../components/loginModal";
import Loader from "../components/loader";

export default function Explore () {
    const [mine, setMine] = useState(false);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [loginRequired, setLoginRequired] = useState(false);
    const smallScreen = useMediaQuery('(max-width: 700px)');
    const firestore = getFirestore();
    const numImages = (
        smallScreen
            ? Math.floor((window.innerHeight-250)/390)
            : Math.floor((window.innerWidth-100)/500) * Math.floor((window.innerHeight-250)/210)
    )
    const { user } = useAuth();

    async function getImages() {
        const userImageObjects = []
        const docRef = doc(firestore, 'users', user.uid)
        const docPromise = await getDoc(docRef)
        const userData = docPromise.data()
        const userImages = userData.images
        for (const imageRef of userImages) {
            // const imageRef = doc(firestore, 'images', image)
            const imageData = await getDoc(imageRef)
            userImageObjects.push({
                ...imageData.data(),
                // get image id
                id: imageData.id
            })
        }
        setImages(userImageObjects);
        setLoading(false);
        return;
    };
    
    useEffect(() => {
        if (!user) return;
        getImages()
    }, [user])

    const authSetMine = () => {
        // if the state is false, check if the user is authenticated before switching
        if (!mine) {
            if (user) { setMine(true) } 
            else { setLoginRequired(true); setMine(true) }
        } else { setMine(false) }
    }

    return (
        <>
            <main className={styles.main}>
                <Toggle setState={authSetMine} state={mine} state1Name={'Mine'} state2Name={'Public'} />
                {mine
                    ? (
                        <div className={styles.imagesBox}>
                            <div className={styles.imagesContainer}>
                                {loading
                                    ? <div className={styles.loader}><Loader /></div>
                                    : images.slice(0,numImages).map((image, index) => (
                                        <ImageDisplay key={index} hit={{url: image.url, prompt: image.prompt, objectID: image.id}} smallScreen={smallScreen} />
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
            {loginRequired && <LoginModal setShowLogin={setLoginRequired} />}
        </>
    )
}