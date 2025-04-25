import { User } from "./User"

interface Team {
    id: number,
    poster: string,
    name: string,
    vkLink?: string,
    tgLink?: string,
    discordLink?: string,
    members?: Array<User>
}

export default Team;