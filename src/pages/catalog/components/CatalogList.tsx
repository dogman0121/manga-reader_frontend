import { useContext } from "react";
import SearchContext from "../../../features/search/context/SearchContext";
import { SECTIONS } from "../../../features/search/components/SearchProvider";
import MangaList from "./MangaList";
import { SxProps } from "@mui/material";
import SearchList from "../../../features/search/components/SearchList";

function CatalogList({view, sx }: {view: string, sx?: SxProps}) {
    const {section} = useContext(SearchContext);

    return (
        <SearchList>
            {section === SECTIONS.MANGA && (<MangaList view={view} sx={sx}/>)}
        </SearchList>
    )
}

export default CatalogList;