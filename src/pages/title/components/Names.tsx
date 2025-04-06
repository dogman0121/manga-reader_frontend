import { useContext } from "react";
import TitleContext from "../../../context/TitleContext";
import { Box, Breadcrumbs, SxProps, Typography } from "@mui/material";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";


function Names({sx}: {sx?: SxProps}) {
    const manga = useContext(TitleContext);

    const device = useDeviceDetect();

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
                    lineHeight: "1em",
                    textAlign: device == DEVICE.MOBILE ? "center" : "left"
                }}
            > {manga?.name} </Typography>
            
        </Box>        
    )
}

export default Names;