import styles from '../styles/homeBackdrop.module.css';
// import sample_images from '../public/images';
import Image from 'next/image';
import { useEffect } from 'react';

export default function HomeBackdrop({ children, images }) {
    // const images = sample_images
    const image_size = 186

    const _getCol = () => {
        let row = []
        for (let i = 0; i < 5; i++) {
            const { url, prompt } = images[i]
            // random hegiht between 131 and 231
            // let height = Math.floor(Math.random() * 100) + 131
            let hasPrompt = Math.random() >= 0.3
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
        for (let i = 0; i < numCols; i++) {
            cols.push(
                <div key={i} className={styles.imageCol}>
                    { _getCol() }
                </div>
            )
        }
        return cols
    }

    return children
    
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