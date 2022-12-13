import styles from '../styles/vinylBackdrop.module.css';
import Image from 'next/image';

export default function VinylBackdrop({ children }) {
    /*
    Create a component that overlays the logo behind the
    content. It should have a black 50% opacity background
    and the logo should be centered in the middle of the
    screen.
    */

    const logoPositions = [
        // Random X and Y positions for the logos btwn 0 and 85
        {x: 1350, y: 15},
        {x: 601, y: 500},
        {x: 1000, y: 600},
        {x: 1200, y: 400},
        {x: 200, y: 200},
        {x: 125, y: 564},
        {x: 900, y: 200},
        {x: 1231, y: 186},
        {x: 80, y: 50, right: true},
        {x: 400, y: 75, bottom: true},
        {x: 40, y: 350, right: true},
        {x: 1050, y: 60},
        {x: 450, y: 300}
    ]

    const logoCount = logoPositions.length;
    // const logoCount = 1
   
   function getLogos(numLogos) {
       let logos = [];
       for (let i = 0; i < numLogos; i++) {
            const logoPosition = logoPositions[i];

            let styling = {
                [logoPosition.bottom ? 'bottom' : 'top']: `${logoPosition.y}px`,
                [logoPosition.right ? 'right' : 'left']: `${logoPosition.x}px`,
            }
            
            logos.push(
                <div className={styles.logoBox} style={styling}>
                    <Image 
                        src='/Logo.png' 
                        alt='Better Than You Society Logo' 
                        width={175} height={175}
                    />
                </div>
            )
        }
    return logos
    }

    return (
        <>
            <div className={styles.logosContainer}>
                {getLogos(logoCount)}
            </div>
            <div className={styles.backdrop}>
                {children}
            </div>
        </>
    )
}