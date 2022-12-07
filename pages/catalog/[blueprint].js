import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { getFunctions, httpsCallable } from 'firebase/functions';
import useAuth from '../../src/auth/authContext';

export default function CatalogItem() {
    const [unique, setUnique] = useState([]);
    const [variants, setVariants] = useState([]);
    const [item, setItem] = useState({});
    const router = useRouter();
    const { blueprint } = router.query;
    const functions = getFunctions();
    const { user } = useAuth();

    useEffect(() => {
        const getInfo = async () => {
            // get function from us-central1
            const getBlueprintInfo = httpsCallable(functions, 'getBlueprintInfo');
            await getBlueprintInfo({ blueprint_id: blueprint, token: user.accessToken })
                .then((result) => {
                    console.log(result)
                    // const { unique, variants } = result.data;
                    // setUnique(unique);
                    // setVariants(variants);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        getInfo();
    }, [blueprint]);

    return (
        <div>
            <h1>{blueprint}</h1>
            {/* button to log unique values */}
            <button onClick={() => console.log(unique)}>Log Unique Values</button>
            {/* button to log variants */}
            <button onClick={() => console.log(variants)}>Log Variants</button>
        </div>
    )
}