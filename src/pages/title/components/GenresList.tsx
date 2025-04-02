import { useContext } from "react";
import { Link } from "react-router-dom";
import TitleContext from "../../../context/TitleContext";
import Genre from "../../../types/Genre";
import { Box } from "@mui/material";



function GenreItem({ genre } : { genre: Genre}) {
    return (
        <Link to={`/catalog?genre=${genre.id}`}>
            <Box
                sx={{
                    padding: "4px 16px",
                    borderRadius: "6px",

                    bgcolor: "var(--widget1-color)",
                    lineHeight: "1em"
                }}
            >
                {genre.name}
            </Box>
        </Link>
    )
}

function GenresList() {
    const manga = useContext(TitleContext);

    if (!manga || !manga?.genres)
        return <></>;

    return (
        <Box
            sx={{
                display: "flex",
                
                columnGap: "5px",
                rowGap: "5px"
            }}
        >
            {manga.genres.map((genre) => <GenreItem key={genre.id} genre={genre} />)}
        </Box>
    )
}

export default GenresList;