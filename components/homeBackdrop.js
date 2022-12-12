import styles from '../styles/homeBackdrop.module.css';
// import sample_images from '../public/images';
import Image from 'next/image';
import { useEffect } from 'react';

export default function HomeBackdrop({ children, images }) {
    // const sample_prompts = [
    //     'Testing Prompt Number One',
    //     'Testing Prompt Number Two With A Longer String',
    //     'Testing Prompt Number Three With A Much Longer String With Extra Words',
    //     'Short Prompt 4',
    //     'Testing Prompt Number Five',
    //     'Testing Prompt Number Six With A Few Extra Words',
    //     'Testing Prompt Number Seven With A Few Extra Words And Some More on Top',
    // ]

    // const images = sample_images
    const image_size = 131

    useEffect(() => {
        console.log(images)
    })

    const _getCol = () => {
        let row = []
        for (let i = 0; i < 5; i++) {
            const { url, prompt } = images[i]
            // random hegiht between 131 and 231
            // let height = Math.floor(Math.random() * 100) + 131
            let hasPrompt = Math.random() >= 0.3
            let height = hasPrompt ? 180 : 131
            // let height = 131
            row.push(
                <div className={styles.imageContainer} style={{height}}>
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
                <div key={i}>
                    { _getCol() }
                </div>
            )
        }
        return cols
    }
    
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