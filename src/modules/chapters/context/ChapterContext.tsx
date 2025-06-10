import { createContext } from "react";
import Chapter from "../types/Chapter";

interface ChapterContextProps {
    chapter: Chapter | null,
    setChapter: Function
}

const ChapterContext = createContext<ChapterContextProps>({chapter: null, setChapter: () => {}});

export default ChapterContext;