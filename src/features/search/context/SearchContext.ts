import { createContext } from "react";
import Title from "../../../types/Title";

interface SearchContextProps {
    query: string,
    setQuery: Function,
    results: Array<Title>,
    setResults: Function,
    section: string,
    setSection: Function,
    filters: Map<string, number>,
    setFilters: Function,
    isLoading: boolean
}

const SearchContext = createContext<SearchContextProps>({
    query: "",
    setQuery: () => {},
    results: [],
    setResults: () => {},
    section: "",
    setSection: () => {},
    filters: new Map<string, number>(),
    setFilters: () => {},
    isLoading: false
});

export default SearchContext;