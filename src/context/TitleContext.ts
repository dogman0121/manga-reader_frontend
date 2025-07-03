import { createContext } from "react";
import Title from "../modules/titles/types/Title";


interface TitleContextProps {
    title: Title | null
}

const TitleContext = createContext<TitleContextProps>({title: null});


export default TitleContext;