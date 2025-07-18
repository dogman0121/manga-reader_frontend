import { useContext } from "react";
import SearchContext from "../context/SearchContext";
import { Box, SxProps } from "@mui/material";
import Title from "../../../modules/titles/types/Title";
import { useTheme } from "@mui/material/styles";
import { SECTIONS } from "./SearchProvider";
import SearchList from "./SearchList";
import { Link } from "react-router-dom";
import Poster from "../../../components/ui/Poster";


function MangaItem({ item }: { item: Title }) {
    const theme = useTheme()

    return (
        <Link to={`/manga/${item.slug}`}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    p: "6px 10px",
                    borderRadius: "6px",
                    bgcolor: theme.palette.customBackgrounds.widget1
                }}
            >
                <Poster 
                    src={item.main_poster?.thumbnail || ""}
                    width="50px"
                />
                <Box
                    sx={{
                        ml: "10px",
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Box fontSize={"15px"}>{item.name}</Box>
                </Box>
            </Box>
        </Link>
    )
}

function SearchListModal({ sx }: { sx?: SxProps }) {
    const { section, results } = useContext(SearchContext);

    return (
        <>
            <SearchList 
                className="scrollable"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "8px",
                    ...sx
                }}
            >
                {section === SECTIONS.MANGA && (
                    <>
                        {results.slice(0, 10).map((result) => 
                            <MangaItem item={result} key={result.id}/>
                        )}
                    </>
                )} 
            </SearchList>
        </>
    )
}

export default SearchListModal;