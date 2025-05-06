import Genre from "./Genre";
import Person from "./Person";
import Poster from "./Poster";
import Team from "./Team";
import Translation from "./Translation";
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
    views?: number,
    rating?: number,
    rating_count?: number,
    saves?: number,
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
    genres?: Array<Genre>,
    authors?: Array<Person>,
    artists?: Array<Person>,
    publishers?: Array<Person>,
    translations?: Array<Translation>,
    creator?: User,
    created_at?: Date,
    chapters?: Array<Object>,
    similar?: Array<Title>,
    teams?: Array<Team>,
    permissions?: {
        edit: boolean
    },
    user_rating?: number
}