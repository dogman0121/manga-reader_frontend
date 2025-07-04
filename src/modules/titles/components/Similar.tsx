import { Box, Typography } from "@mui/material";
import Poster from "../../../components/ui/Poster";
import Title from "../types/Title";
import useTitle from "../hooks/useTitle";

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
    const {title} = useTitle();

    if (!title || !title.similar)
        return null;

    return (
        <Box>
            <Typography fontSize={"22px"} lineHeight={1}>Похожее</Typography>
            <Box
                sx={{
                    mt: "5px"
                }}
            >
                {title.similar.map((title) => <SimilarItem key={title.id} manga={title}/>) }
            </Box>
        </Box>
    )
}

export default Similar;