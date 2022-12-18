import styles from '../styles/cartDisplay.module.css';
import Image from 'next/image';
import stickerVariants from '../src/utils/stickerVariants';

export default function CartDisplay({ url, prompt, imageSize, itemId, updateItem }) {
    return (
        <main className={styles.main}>
            <div className={styles.imageContainer}>
                <div className={styles.image}>
                    <Image src={url} alt={prompt} width={imageSize} height={imageSize} />
                </div>
                <div className={styles.info}>
                    <h4 className={styles.prompt}>
                        {
                            prompt.length > 80
                                ? prompt.slice(0, 80) + '...'
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
                                Quantity: 
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
                        </div>
                        <div className={styles.size}>
                            {/* drop down input selection for size: [2x2, 3x3, 4x4, 6x6] */}
                            <label
                                htmlFor='size'
                                className={styles.sizeLabel}
                            >
                                Size:
                            </label>
                            <select
                                name='size'
                                id='size'
                                className={styles.sizeInput}
                                onChange={(e) => updateItem(itemId, {size: e.target.value})}
                            >
                                {
                                    Object.keys(stickerVariants).map((key, index) => {
                                        return <option value={key} key={index}>{stickerVariants[key]}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}