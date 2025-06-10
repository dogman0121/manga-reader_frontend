import { createContext } from "react";
import Title from "../../../pages/title/types/Title";
import { SECTIONS } from "../components/SearchProvider";

interface SearchContextProps {
    query: string,
    setQuery: Function,
    results: Array<Title>,
    setResults: Function,
    section: string,
    setSection: Function,
    filters: Map<string, string[]>,
    setFilters: Function,
    isLoading: boolean
}

const SearchContext = createContext<SearchContextProps>({
    query: "",
    setQuery: () => {},
    results: [],
    setResults: () => {},
    section: SECTIONS.MANGA,
    setSection: () => {},
    filters: new Map<string, string[]>(),
    setFilters: () => {},
    isLoading: false
});

export default SearchContext;