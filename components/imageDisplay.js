import Image from 'next/image';
import styles from '../styles/imageDisplay.module.css';
import globalStyles from '../styles/global.module.css';
import useMediaQuery from '../src/hooks/mediaQuery';
import ExpandableButton from './expandableButton';
import createSession from '../src/utils/checkout';
import { getFirestore } from 'firebase/firestore';
import useAuth from '../src/auth/authContext';

export default function ImageDisplay({ hit }) {
    const smallScreen = useMediaQuery('(max-width: 700px)')
    const imageSize = smallScreen ? 256 : 160;
    const { url, prompt } = hit
    const firestore = getFirestore();
    const { user } = useAuth();
    const line_items = [{
        price_data: {
            currency: 'usd',
            // product_data: { name: prompt, images: [url] },
            product_data: { name: prompt, images: ['https://storage.googleapis.com/vidiths_test_bucket/Soccer.jpg'] },
            unit_amount: 800,
        },
        quantity: 1,
    }]
    const additionalData = {
        metadata: {
            'uid': user.uid,
            '0_name': prompt,
            '0_image': url,
        }
    }

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
            <div className={styles.hoverWrapper}>
                <ExpandableButton icon='/shopping-cart-black.svg' text='Add to Cart' iconSize={40} />
                <ExpandableButton icon='/credit-card.svg' text='Buy Now' iconSize={40} onClick={() => createSession(firestore, user, line_items, additionalData)} />
            </div>
        </main>
    )
}