import Image from 'next/image';
import styles from '../styles/imageDisplay.module.css';
import globalStyles from '../styles/global.module.css';
import useMediaQuery from '../src/hooks/mediaQuery';

export default function ImageDisplay({ hit }) {
    const smallScreen = useMediaQuery('(max-width: 700px)')
    const imageSize = smallScreen ? 256 : 160;
    // if (hit) {
    //     let { url, prompt } = hit
    //     let image = url
    //     console.log(hit)
    // }

    const { url, prompt } = hit

    return (
        <main className={styles.main}>
            <div className={styles.imageContainer}>
                <div className={styles.image}>
                    <Image src={url} alt={prompt} width={imageSize} height={imageSize} />
                </div>
                <h4 className={styles.prompt}>
                    {
                        prompt.length > 100
                            ? smallScreen
                                ? prompt.slice(0, 40) + '...'
                                : prompt.slice(0, 60) + '...'
                            : prompt
                    }
                </h4>
            </div>
        </main>
    )
}