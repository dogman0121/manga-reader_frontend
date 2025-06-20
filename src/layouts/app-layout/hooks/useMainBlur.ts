import { useContext } from "react";
import MainBlurContext from "../MainBlurContext";

export default function useMainBlur() {
    const {opened, content, setOpened, setContent} = useContext(MainBlurContext);

    return {opened, content, setOpened, setContent};
}