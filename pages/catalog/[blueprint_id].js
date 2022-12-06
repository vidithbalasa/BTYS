import { useRouter } from "next/router";

export default function catalogItem() {
    const router = useRouter();
    const { blueprint_id } = router.query;

    return (
        <div>
            <h1>{blueprint_id}</h1>
        </div>
    )
}