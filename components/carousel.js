import { motion, AnimatePresence } from 'framer-motion';

export default function Carousel({ currentIndex, images }) {

    return (
        <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }}>
            <AnimatePresence>
                {
                    images.map((image, index) => {
                        return (
                            <motion.img
                            key={index}
                            src={image}
                            alt="product-image"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ display: index === currentIndex ? 'block' : 'none' }}
                            width={400}
                            height={400}
                            />
                            )
                        })
                    }
            </AnimatePresence>
        </motion.div>
    )
}