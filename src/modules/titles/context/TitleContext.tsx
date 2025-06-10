import { createContext } from "react"
import Title from "../../../pages/title/types/Title"

interface TitleContextProps {
    title: Title | null,
    setTitle: Function
}

const TitleContext = createContext<TitleContextProps>({title: null, setTitle: () => {}});


export default TitleContext;