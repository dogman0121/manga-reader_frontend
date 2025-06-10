import { useContext } from "react";
import SearchContext from "../context/SearchContext";
import { Box, SxProps } from "@mui/material";
import Title from "../../../pages/title/types/Title";
import { useTheme } from "@mui/material/styles";
import { SECTIONS } from "./SearchProvider";
import SearchList from "./SearchList";
import { Link } from "react-router-dom";
import Poster from "../../../components/ui/Poster";


function MangaItem({ item }: { item: Title }) {
    const theme = useTheme()

    return (
        <Link to={`/manga/${item.id}`}>
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

function SearchListModal({ sx }: { sx: SxProps }) {
    const { section, results } = useContext(SearchContext);

    return (
        <>
            <SearchList sx={sx}>
                {section === SECTIONS.MANGA && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "5px"
                        }}
                    >
                        {results.map((result) => 
                            <MangaItem item={result} key={result.id}/>
                        )}
                    </Box>
                )} 
            </SearchList>
        </>
    )
}

export default SearchListModal;