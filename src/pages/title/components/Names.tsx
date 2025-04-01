import { useContext } from "react";
import TitleContext from "../../../context/TitleContext";
import { Box, Breadcrumbs, Typography } from "@mui/material";


function Names() {
    const manga = useContext(TitleContext);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Breadcrumbs>
                <Typography>манхва</Typography>
                <Typography>2020</Typography>
                <Typography>выпускается</Typography>
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