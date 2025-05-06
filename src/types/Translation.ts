import Team from "./Team";
import { User } from "./User";

export default interface Translation {
    id: number,
    translator_type: "team" | "user",
    translator: Team & User,
    chapters_count: number
}