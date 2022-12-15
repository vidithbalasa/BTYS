import { useRouter } from "next/router";
import globalStyles from '../styles/global.module.css';

export default function Success() {
    // Get query param session_id
    const router = useRouter();
    const { session_id } = router.query;

    return (
        <main className={globalStyles.main}>
            <h1 className={globalStyles.title}>Success</h1>
            <p>Session ID: {session_id}</p>
        </main>
    )
}