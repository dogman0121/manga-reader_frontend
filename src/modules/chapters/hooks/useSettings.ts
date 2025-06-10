import { useContext } from "react"
import ReaderSettingsContext from "../context/ReaderSettingsContext"

export default function useSettings() {
    const props = useContext(ReaderSettingsContext)   
    
    return props;
}