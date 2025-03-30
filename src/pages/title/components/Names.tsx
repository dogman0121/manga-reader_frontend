import { useContext } from "react";
import TitleContext from "../../../context/TitleContext";
import { Box, Typography } from "@mui/material";


function Names() {
    const manga = useContext(TitleContext);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Typography
                sx={{
                    fontSize: "18px"
                }}
            > Please, leave me / 나를 버려주세요 </Typography>
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