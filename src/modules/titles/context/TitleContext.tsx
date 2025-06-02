import { createContext } from "react"
import Title from "../../../types/Title"

interface TitleContextProps {
    title: Title | null
}

const TitleContext = createContext<TitleContextProps>({title: null});


export default TitleContext;