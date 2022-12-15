import { withProtected } from "../src/auth/route"
import styles from '../styles/cart.module.css';


function Cart() {

    return (
        <>
            <main className={styles.main}>
                <h1>Cart</h1>
            </main>
        </>
    )
}

export default withProtected(Cart);