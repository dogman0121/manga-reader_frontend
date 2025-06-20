import FormFile from "../../../features/form/types/FormFile";
import { User } from "../../../types/User";

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
    genres: number[],
    authors: User[],
    artists: User[]
    publishers: User[],
    mainPoster: FormFile,
    background: FormFile,
    newPosters: Array<FormFile>
    posters: Array<FormFile>
}