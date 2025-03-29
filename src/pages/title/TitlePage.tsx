import { useParams } from "react-router-dom";

export default function TitlePage() {
    const { id } = useParams();

    return (
        <>
            Title
            id: {id}
        </>
    )
};