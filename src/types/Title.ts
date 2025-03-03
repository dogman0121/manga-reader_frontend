import { User } from "./User";

export default interface Title {
    id: number,
    name: string,
    description: string,
    poster: string,
    year?: number,
    type?: {
        id: number,
        name: string
    },
    status?: {
        id: number,
        name: string
    },
    genres?: Array<{id: number, name: string}>,
    author?: Object,
    artist?: Object,
    publisher?: Object,
    translators?: Array<Object>,
    creator?: User,
    created_at?: Date,
    chapters?: Array<Object>
}