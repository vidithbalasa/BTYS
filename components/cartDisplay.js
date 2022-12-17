import imageDisplayStyles from '../styles/imageDisplay.module.css';
import styles from '../styles/cartDisplay.module.css';
import Image from 'next/image';

export default function CartDisplay({ url, prompt, imageSize }) {
    return (
        <main className={imageDisplayStyles.main}>
            <div className={imageDisplayStyles.imageContainer}>
                <div className={imageDisplayStyles.image}>
                    <Image src={url} alt={prompt} width={imageSize} height={imageSize} />
                </div>
                <div className={styles.info}>
                    <h4 className={imageDisplayStyles.prompt}>
                        {
                            prompt.length > 100
                            ? smallScreen
                                ? prompt.slice(0, 60) + '...'
                                : prompt.slice(0, 80) + '...'
                            : prompt
                        }
                    </h4>
                    <div className={styles.selection}>
                        <div className={styles.quantity}>
                            {/* input selection for quantity number */}
                            <label
                                htmlFor='quantity'
                                className={styles.quantityLabel}
                            >
                                Quantity
                            </label>
                            <input
                                type='number'
                                name='quantity'
                                id='quantity'
                                min='1'
                                max='10'
                                defaultValue='1'
                                className={styles.quantityInput}
                            />
                            {/* input selection for size: [2x2, 3x3, 4x4, 6x6] */}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}