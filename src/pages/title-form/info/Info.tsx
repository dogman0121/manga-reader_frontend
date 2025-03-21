import { Box } from "@mui/material"
import NameTranslations from "./NameTranslations";
import Genres from "./Genres";
import Authors from "./Authors";
import Artists from "./Artists";
import Publishers from "./Publishers";
import Name from "./Name";
import Description from "./Description";
import Type from "./Type";
import Status from "./Status";
import Year from "./Year";
import Adult from "./Adult";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";


function InfoMobile() {
    return (
        <>
            <Name />
            <NameTranslations />
            <Description />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    columnGap: "8px",
                    rowGap: "10px"
                }}
            >
                <Type/>
                <Status />
                <Year />
                <Adult />
            </Box>

            <Genres />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "7px"
                }}
            >
                <Authors />
                <Artists />
                <Publishers />
            </Box>
            
        </>
    )
}

function InfoPC() {
    return (
        <>
            <Name />
            <NameTranslations />
            <Description />
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    columnGap: "8px",
                    rowGap: "10px"
                }}
            >
                <Type/>
                <Status />
                <Year />
                <Adult />
            </Box>

            <Genres />

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "7px"
                }}
            >
                <Authors />
                <Artists />
                <Publishers />
            </Box>
            
        </>
    )
}

function Info() {
    const device = useDeviceDetect();

    return (
        <>
            {device === DEVICE.MOBILE?
                <InfoMobile />
                : 
                <InfoPC />
            }
        </>
    )
}

export default Info;