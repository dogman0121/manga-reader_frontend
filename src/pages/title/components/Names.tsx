import { useContext } from "react";
import TitleContext from "../../../context/TitleContext";
import { Box, Breadcrumbs, SxProps, Typography } from "@mui/material";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";


function Names({sx}: {sx?: SxProps}) {
    const {title} = useContext(TitleContext);

    const { device } = useDeviceDetect();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                ...sx
            }}
        >
            <Breadcrumbs>
                <Typography>{title.type?.name || "нет"}</Typography>
                <Typography>{title.year || "2025"}</Typography>
                <Typography>{title.status?.name || "нет"}</Typography>
            </Breadcrumbs>
            <Typography
                sx={{
                    fontSize: "28px",
                    lineHeight: "1em",
                    textAlign: device == DEVICE.MOBILE ? "center" : "left"
                }}
            > {title?.name} </Typography>
            
        </Box>        
    )
}

export default Names;