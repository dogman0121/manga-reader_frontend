import { createContext } from "react";
import Title from "../pages/title/types/Title";
import { EMPTY_TITLE } from "../pages/title/types/Title";


interface TitleContextProps {
    title: Title
}

const TitleContext = createContext<TitleContextProps>({title: EMPTY_TITLE});


export default TitleContext;