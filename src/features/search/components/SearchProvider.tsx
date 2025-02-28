import { useEffect, useState, useRef } from "react";
import SearchContext from "../context/SearchContext";
import { searchService } from "../services/api/searchService";
import Title from "../../../types/Title";


export enum SECTIONS {
    MANGA = "manga",
    TEAM = "team",

}

function SearchProvider({ children }: { children: React.ReactNode }) {
    const [query, setQuery] = useState<string>("");

    const [section, setSection] = useState<string>(SECTIONS.MANGA);

    const [results, setResults] = useState<Array<Title>>([]);

    const [filters, setFilters] = useState<Map<string, number>>(new Map<string, number>());

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const timerId = useRef<number>(0);

    const firstRender = useRef<boolean>(true);

    useEffect(() => {
        if (firstRender.current)
            return () => {firstRender.current = false};

        if (query === ""){
            setIsLoading(false);
            setResults([]);
            return () => {}
        }

        setIsLoading(true);
        
        timerId.current = setTimeout(async () => {
            const response = await searchService.search(query, section, filters);

            setResults(await response.json());

            setIsLoading(false);
        }, 500);

        return () => {
            clearTimeout(timerId.current);
        }
    }, [query, section, filters])

    return (
        <SearchContext.Provider
            value={{
                query: query,
                setQuery: setQuery,
                section: section,
                setSection: setSection,
                results: results,
                setResults: setResults,
                filters: filters,
                setFilters: setFilters,
                isLoading: isLoading
            }}
        >
            { children }
        </SearchContext.Provider>
    )
}

export default SearchProvider;