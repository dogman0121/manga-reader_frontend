import { useDeviceDetect, DEVICE } from "../../../hooks/useDeviceDetect";
import { Box, Tab, useTheme } from "@mui/material";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import TitleContext from "../../../context/TitleContext";
import { useContext, useState } from "react";
import Poster from "../../../components/ui/Poster";
import Names from "./Names";
import About from "./About";
import GenresList from "./GenresList";
import OtherNames from "./OtherNames";
import Similar from "./Similar";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Chapters from "./Chapters";
import Stats from "./Stats";
import Comments from "./Comments";
import { AppContent } from "../../../layouts/app-layout/AppLayout";


function ContentMobile(){
    const manga = useContext(TitleContext);

    const [section, setSection] = useState<string>('1');
    
    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };

    return (
        <>
            <Box
                sx={{
                    p: "40px 0 10px",
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Poster 
                    src={manga.main_poster?.medium || ""}
                    width="min(60%, 270px)"
                />
            </Box>
            <Names 
                sx={{
                    alignItems: "center"
                }}
            />
            <Stats 
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                }}
            />
            <TabContext value={section}>
                <TabList onChange={handleChange}>
                    <Tab label="Инфо" value="1" />
                    <Tab label="Главы" value="2" />
                    <Tab label="Комментарии" value="3" />
                </TabList>
                <TabPanel value="1" sx={{p:"20px 5px"}}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "20px"
                        }}
                    >
                        <About />
                        <GenresList />
                        <OtherNames />
                        <Similar />
                    </Box>
                </TabPanel>
                <TabPanel value="2"><Chapters /></TabPanel>
                <TabPanel value="3" sx={{p:"20px 5px"}}><Comments /></TabPanel>
            </TabContext>
        </>
    )
}

function ContentPC() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                py: "30px"
            }}
        >
            <LeftSide />
            <RightSide />
        </Box>
    )
}

function Content() {
    const device = useDeviceDetect();

    const {background} = useContext(TitleContext);

    const theme = useTheme();

    return (
        <Box
        >
            <AppContent>
                {device == DEVICE.MOBILE ?
                    <ContentMobile/>
                    :
                    <ContentPC/>
                }
            </AppContent>
            {background && (
                <Box
                    sx={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        width: "100%",
                        zIndex: "-1",
                    }}
                >
                    <img src={background} style={{width: "100%", height: "100%"}} />
                    <Box 
                        sx={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            background: `linear-gradient(rgba(${theme.vars.palette.background.defaultChannel} / 0.95), rgba(${theme.vars.palette.background.defaultChannel} / 1))`,
                            backgroundSize: "initial",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundPositionY: "0"
                        }}
                    />
            </Box>
            )}
        </Box>
    )
}

export default Content;