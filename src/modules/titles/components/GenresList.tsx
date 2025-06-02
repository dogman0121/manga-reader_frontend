import { Link } from "react-router-dom";
import Genre from "../../../types/Genre";
import { Box, useTheme } from "@mui/material";
import useTitle from "../hooks/useTitle";



function GenreItem({ genre } : { genre: Genre}) {
    const theme = useTheme()

    return (
        <Link to={`/catalog?genre=${genre.id}`}>
            <Box
                sx={{
                    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
                    borderRadius: "6px",

                    bgcolor: theme.palette.secondary.main,
                    lineHeight: "1em"
                }}
            >
                {genre.name}
            </Box>
        </Link>
    )
}

function GenresList() {
    const title = useTitle();

    if (!title?.genres || title.genres.length == 0)
        return null;
    
    return (
        <Box
            sx={{
                display: "flex",
                
                columnGap: "5px",
                rowGap: "5px"
            }}
        >
            {title.genres.map((genre) => <GenreItem key={genre.id} genre={genre} />)}
        </Box>
    )
}

export default GenresList;