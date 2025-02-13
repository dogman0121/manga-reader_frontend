import { useParams } from "react-router-dom";

export default function Title() {
    const { id } = useParams();

    return (
        <>
            Title
            id: {id}
        </>
    )
};