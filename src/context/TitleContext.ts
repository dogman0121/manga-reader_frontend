import { createContext } from "react";
import Title from "../types/Title";
import { EMPTY_TITLE } from "../types/Title";


interface TitleContextProps {
    title: Title
}

const TitleContext = createContext<TitleContextProps>({title: EMPTY_TITLE});


export default TitleContext;