import Genre from "../../../types/Genre";
import Poster from "../../../types/Poster";
import Team from "../../../types/Team";
import Translation from "./Translation";
import { User } from "../../../types/User";

export default interface Title {
    id: number,
    name: string,
    name_translations?: {
        lang: string,
        name: string
    }[],
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
    authors?: User[],
    artists?: User[],
    publishers?: User[],
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