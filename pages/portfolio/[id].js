import { useRouter } from 'next/router';

export default function Artwork() {
    const router = useRouter();
    const { id } = router.query;
    
    return (
        <main>
            <h1>Artwork</h1>
        </main>
    );
}