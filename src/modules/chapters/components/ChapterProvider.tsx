import { Children } from "react";
import ChapterContext from "../context/ChapterContext";
import Chapter from "../types/Chapter";

export default function ChapterProvider({
    chapter,
    setChapter, 
    children
}: {
    chapter: Chapter | null,
    setChapter: Function, 
    children?: React.ReactElement | React.ReactElement[]
}){

    return (
        <ChapterContext.Provider value={{
            chapter: chapter,
            setChapter: setChapter,
        }}>
            {Children.map(children, (child) => child)}
        </ChapterContext.Provider>
    )

}