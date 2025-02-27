import { User } from "./User";

export default interface Title {
    id: number,
    name: string,
    description: string,
    poster: string,
    year?: number,
    status?: string,
    genres?: Array<Object>,
    author?: Object,
    artist?: Object,
    publisher?: Object,
    translators?: Array<Object>,
    creator?: User,
    created_at?: Date,
    chapters?: Array<Object>
}