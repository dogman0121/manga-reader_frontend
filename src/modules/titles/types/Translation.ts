import Team from "../../../types/Team";
import { User } from "../../../types/User";

export default interface Translation {
    id: number,
    translator_type: "team" | "user",
    translator: Team | User,
    chapters_count: number,
    permissions: {
        update?: boolean,
        delete?: boolean,
        add_chapters?: boolean
    } 
}