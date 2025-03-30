import { User } from "./User"

interface Chapter {
    id: number,
    name?: string,
    tome: number,
    chapter: number,
    title: number,
    team: number,
    date: string
    creator: User
}

export default Chapter;