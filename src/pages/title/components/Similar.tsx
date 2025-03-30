import { useContext } from "react";
import Title from "../../../types/Title";
import { Box, Typography } from "@mui/material";
import Poster from "../../../components/ui/Poster";
import TitleContext from "../../../context/TitleContext";

function SimilarItem({ manga }: {manga: Title}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "10px",
                alignItems: "center"
            }}
        >
            <Poster width="60px" src={manga.main_poster?.small || ""}/>
            <Box>
                <Typography fontSize={"15px"}>{manga.name}</Typography>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        fontSize: "14px"
                    }}
                >
                    <Typography>{manga.type?.name}</Typography>
                    <Typography>{manga.year}</Typography>
                </Box>
            </Box>
        </Box>
    )
}


function Similar() {
    const manga = useContext(TitleContext);

    if (!manga || !manga.similar)
        return null;

    return (
        <Box>
            <Typography fontSize={"22px"} lineHeight={1}>Похожее</Typography>
            <Box
                sx={{
                    mt: "5px"
                }}
            >
                {manga.similar.map((title) => <SimilarItem key={title.id} manga={title}/>) }
            </Box>
        </Box>
    )
}

export default Similar;