import { useContext } from "react";
import ChapterContext from "../context/ChapterContext";

export default function useChapter() {
    const {chapter, setChapter} = useContext(ChapterContext);

    return { chapter, setChapter };
}