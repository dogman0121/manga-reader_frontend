import Page from "./Page";
import Team from "../../../types/Team";
import { User } from "../../../types/User"

interface Chapter {
    id: number,
    name?: string,
    tome: number,
    chapter: number,
    title: number,
    team: Team,
    date: string
    creator: User,
    pages: Array<Page>,
    next_chapter?: Chapter,
    previous_chapter?: Chapter
}

export default Chapter;