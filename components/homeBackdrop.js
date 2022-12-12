import styles from '../styles/homeBackdrop.module.css';
import Image from 'next/image';
import { useEffect } from 'react';

export default function HomeBackdrop({ children, images }) {
    const image_size = 186

    useEffect(() => {
        console.log(images)
    })

    const _getCol = () => {
        let row = []
        for (let i = 0; i < 5; i++) {
            const { url, prompt } = images[i]
            // random hegiht between 131 and 231
            // let height = Math.floor(Math.random() * 100) + 131
            let hasPrompt = Math.random() >= 0.4
            let height = hasPrompt ? image_size + 50 : image_size
            // let height = 131
            row.push(
                <div className={styles.imageContainer} style={{height, width: image_size}} key={i}>
                    {/* image should always be full size, prompt should be cut off */}
                    <div className={styles.boxItems}>
                        <Image src={url} alt="Sample Image" width={image_size} height={image_size} />
                        {
                            hasPrompt &&
                            <h5 className={styles.prompt}>{prompt}</h5>
                        }
                    </div>
                </div>
            )
        }
        return row
    }

    const getCols = (numCols) => {
        let cols = []
        // random translation between 20 and 50
        let randomTranslate = Math.floor(Math.random() * 30) + 20
        for (let i = 0; i < numCols; i++) {
            cols.push(
                <div key={i} className={styles.imageCol} style={{transform: `translateY(-${randomTranslate}%)`}}>
                    { _getCol() }
                </div>
            )
        }
        return cols
    }

    // return children
    return (
        <>
            {children}
            {/* button to console log images */}
            <button onClick={() => console.log(images)}>Log Images</button>
        </>
    )
    
    return (
        <>
            <div className={styles.imagesBox}>
                { getCols(10) }
                {/* <div>{ _getCol() }</div> */}
            </div>
            <div className={styles.wrapper}>
                {children}
            </div>
        </>
    )
}