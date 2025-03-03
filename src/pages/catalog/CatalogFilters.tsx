import { useContext } from "react";
import SearchContext from "../../features/search/context/SearchContext";
import { SECTIONS } from "../../features/search/components/SearchProvider";
import MangaFilters from "./MangaFilters";

function CatalogFilters() {
    const { section } = useContext(SearchContext);

    return (
        <>
            {section === SECTIONS.MANGA && (<MangaFilters />)}
        </>
    )
}

export default CatalogFilters;