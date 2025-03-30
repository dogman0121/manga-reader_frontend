import React, { useContext, useState } from "react";
import Stats from "./Stats";
import Names from "./Names";
import About from "./About";
import Similar from "./Similar";
import ReadButton from "./ReadButton";
import RatingButton from "./Rating";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import GenresList from "./GenresList";
import Chapters from "./Chapters";
import Comments from "./Comments";
import { Box } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TitleContext from "../../../context/TitleContext";


function RightSide() {
    const title = useContext(TitleContext);

    const [section, setSection] = useState<string>('1');
    
    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };

    const device = useDeviceDetect();

    if (device === DEVICE.MOBILE)
        return null;

    return (
        <Box
            sx={{
                width: "100%",
                ml: "25px",
                maxWidth: "955px",
                minWidth: "400px",
                position: "relative",

                display: "flex",
                flexDirection: "column"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <Names />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <ReadButton />
                    <RatingButton />
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "25px"
                }}
            >
                <Box
                    sx={{
                        width: title.similar ? "645px" : null,
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "20px"
                    }}
                >
                    <Stats />
                    <About />
                    <GenresList />
                    { device === DEVICE.PAD && <Similar />}
                    <TabContext value={section}>
                        <TabList onChange={handleChange}>
                            <Tab label="Главы" value="1" />
                            <Tab label="Комментарии" value="2" />
                        </TabList>
                        <TabPanel value="1"><Comments /></TabPanel>
                        <TabPanel value="2"><Chapters /></TabPanel>
                    </TabContext>
                </Box>
                { device === DEVICE.PC && (
                    <Box>
                        <Similar />
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default RightSide;