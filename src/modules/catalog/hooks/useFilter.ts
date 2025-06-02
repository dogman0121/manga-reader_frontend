import { useContext } from "react";
import SearchContext from "../../../features/search/context/SearchContext";

export default function useFilter(name: string) {
    const { filters, setFilters } = useContext(SearchContext);

    const setValue = (name: string, value: string[]) => {
        setFilters((prev: Map<string, string[]>) => {
            const newMap = new Map(prev);
            newMap.set(name, value);
            return newMap;
        })
    }  
    
    return {
        name: name, 
        value: filters.get(name) || [],
        setValue: (value: string[]) => {setValue(name, value)}
    };
}