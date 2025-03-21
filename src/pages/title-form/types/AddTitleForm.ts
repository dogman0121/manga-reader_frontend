import Person from "../../../types/Person";
import Poster from "./Poster";

export default interface AddTitleForm {
    name: string,
    nameTranslation: string,
    nameTranslationLang: string,
    nameTranslations: Map<string, string>,
    description: string,
    type: number,
    status: number,
    year: number,
    adult: number,
    genres: Array<{id: number, name:string}>,
    authors: Array<Person>,
    artists: Array<Person>
    publishers: Array<Person>,
    mainPoster: Poster,
    background: Poster,
    new_posters: Array<Poster>
    posters: Array<Poster>
}