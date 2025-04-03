import { useContext } from "react";
import TitleContext from "../../../context/TitleContext";
import { Box, Breadcrumbs, SxProps, Typography } from "@mui/material";


function Names({sx}: {sx?: SxProps}) {
    const manga = useContext(TitleContext);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                ...sx
            }}
        >
            <Breadcrumbs>
                <Typography>{manga.type?.name || "нет"}</Typography>
                <Typography>{manga.year || "2025"}</Typography>
                <Typography>{manga.status?.name || "нет"}</Typography>
            </Breadcrumbs>
            <Typography
                sx={{
                    fontSize: "28px",
                    lineHeight: "1em"
                }}
            > {manga?.name} </Typography>
            
        </Box>        
    )
}

export default Names;