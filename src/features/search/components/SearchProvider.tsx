import { useEffect, useState, useRef, Children } from "react";
import SearchContext from "../context/SearchContext";
import { searchService } from "../services/api/searchService";
import Title from "../../../pages/title/types/Title";


export enum SECTIONS {
    MANGA = "manga",
    TEAM = "team",

}

function SearchProvider({ children, emptyQuery}: { children: React.ReactNode, emptyQuery: boolean }) {
    const [query, setQuery] = useState<string>("");

    const [section, setSection] = useState<SECTIONS>(SECTIONS.MANGA);

    const [results, setResults] = useState<Array<Title>>([]);

    const [filters, setFilters] = useState<Map<string, string[]>>(new Map<string, string[]>());

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const timerId = useRef<undefined | ReturnType<typeof setTimeout>>(undefined);

    // const firstRender = useRef<boolean>(true);

    useEffect(() => {
        // if (firstRender.current)
        //     return () => {firstRender.current = false};

        if (!emptyQuery && query === ""){
            setIsLoading(false);
            setResults([]);
            return () => {}
        }

        setIsLoading(true);
        
        timerId.current = setTimeout(async () => {
            const {data} = await searchService.search(query, section, filters);

            setResults(data || []);

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
            { Children.map(children, (child) => child) }
        </SearchContext.Provider>
    )
}

export default SearchProvider;