import { User } from "../../../types/User";
import Title from "../../titles/types/Title";


export default interface List {
    id: number,
    name: string,
    description: string,
    manga: Title[],
    created_at: string,
    creator: User,
    saves_count: number,
    is_saved_by_user: boolean
}