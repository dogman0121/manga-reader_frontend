import Page from "./Page";
import Team from "./Team";
import { User } from "./User"

interface Chapter {
    id: number,
    name?: string,
    tome: number,
    chapter: number,
    title: number,
    team: Team,
    date: string
    creator: User,
    pages: Array<Page>
}

export default Chapter;