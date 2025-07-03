import { titles } from "../../../mocks/title.mock";
import List from "../components/List";

export default function RecommendationsPage() {
    return (
        <List
            title="Специально для вас"
            titles={titles}
        />
    )
}