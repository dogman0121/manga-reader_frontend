import { useContext } from "react";
import SearchContext from "../../../features/search/context/SearchContext";
import { useTheme } from "@mui/material";
import SearchList from "../../../features/search/components/SearchList";
import TitleItem from "../../../components/TitleItem";

export default function TitleResults() {
    const { results } = useContext(SearchContext);

    const theme = useTheme();
    
    return (
        <SearchList
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                rowGap: theme.spacing(3),
                columnGap: theme.spacing(3),
            }}
        >
            {results.map((title) => <TitleItem title={title} key={title.id}/>)}
        </SearchList>
    )
}