import Person from "./Person";
import Poster from "./Poster";
import { User } from "./User";

export const EMPTY_TITLE : Title = {
    id: 0,
    name: "",
}

export default interface Title {
    id: number,
    name: string,
    name_translations?: Array<{
        lang: string,
        name: string
    }>,
    description?: string,
    main_poster?: Poster,
    background?: string,
    posters?: Array<Poster>,
    year?: number,
    type?: {
        id: number,
        name: string
    },
    status?: {
        id: number,
        name: string
    },
    adult?: {
        id: number,
        name: string
    },
    genres?: Array<{id: number, name: string}>,
    authors?: Array<Person>,
    artists?: Array<Person>,
    publishers?: Array<Person>,
    translators?: Array<Object>,
    creator?: User,
    created_at?: Date,
    chapters?: Array<Object>,
    permissions?: {
        edit: boolean
    }
}