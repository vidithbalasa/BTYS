import { useState } from 'react';
import { useRouter } from "next/router";

export default function CatalogItem() {
    const [item, setItem] = useState({});
    const router = useRouter();
    const { blueprint } = router.query;

    return (
        <div>
            <h1>{blueprint}</h1>
        </div>
    )
}