import { User } from "./User";

export default interface Title {
    id: number,
    name: string,
    description: string,
    main_poster: string,
    background: string,
    posters: Array<string>,
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
    authors?: Object,
    artists?: Object,
    publishers?: Object,
    translators?: Array<Object>,
    creator?: User,
    created_at?: Date,
    chapters?: Array<Object>
}