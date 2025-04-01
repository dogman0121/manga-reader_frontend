import React, { useContext, useState } from "react";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import TitleContext from "../../../context/TitleContext";
import Names from "./Names";
import GenresList from "./GenresList";
import About from "./About";
import Similar from "./Similar";
import SaveButton from "./SaveButton";
import Chapters from "./Chapters";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Poster from "../../../components/ui/Poster";
import { Box } from "@mui/material";
import OtherNames from "./OtherNames";


function ContentMobile(){
    const [section, setSection] = useState<string>('1');
    
    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };

    return (
        <>
            <Names />
            <About />
            <GenresList />
            <OtherNames />
            <Similar />
            <TabContext value={section}>
                <TabList onChange={handleChange}>
                    <Tab label="Инфо" value="1" />
                    <Tab label="Главы" value="2" />
                    <Tab label="Комментарии" value="3" />
                </TabList>
                <TabPanel value="1"> 123123</TabPanel>
                <TabPanel value="2"><Chapters /></TabPanel>
                <TabPanel value="3">321321</TabPanel>
            </TabContext>
        </>
    )
}

function ContentDesktop() {

    return (
        <>
            <SaveButton/>
        </>
    )
}


function LeftSide() {
    const manga = useContext(TitleContext);

    const device = useDeviceDetect();

    return (
        <Box
            sx={{
                minWidth: "150px",
                maxWidth: "220px",
                width: "100%"
            }}
        >
            <Poster 
                src={manga.main_poster?.medium || ""}
            />
            {device === DEVICE.MOBILE ? 
                <ContentMobile /> :
                <ContentDesktop />
            }
        </Box>
    )
}

export default LeftSide;