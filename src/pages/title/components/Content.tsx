import { useDeviceDetect, DEVICE } from "../../../hooks/useDeviceDetect";
import { Box, Paper, Tab, useTheme } from "@mui/material";
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
import RatingButton from "./Rating";
import WestIcon from '@mui/icons-material/West';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router-dom";


function ContentMobile(){
    const { title } = useContext(TitleContext);

    const [section, setSection] = useState<string>('1');
    
    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };

    const navigate = useNavigate();

    return (
        <>
            <Box
                sx={{
                    p: "5px 10px",
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <WestIcon sx={{width: "25px", height: "25px"}} onClick={()=>{navigate(-1)}}/>
                <MoreVertIcon sx={{width: "25px", height: "25px"}}/>
            </Box>
            <Box
                sx={{
                    p: "30px 0 10px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        position: "relative"
                    }}
                >
                    <Poster 
                        src={title.main_poster?.medium || ""}
                        width="min(60%, 270px)"
                    />
                    <Paper
                        sx={{
                            position: "absolute",
                            bottom: "10px",
                            borderRadius: "6px",
                            p: "0 10px"
                        }}
                    >
                        <RatingButton />
                    </Paper>
                </Box>
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

    const { title } = useContext(TitleContext);

    const filter = device == DEVICE.MOBILE ? 0.8 : 0.9

    const theme = useTheme();

    return (
        <Box
            // sx={{
            //     background: `
            //         linear-gradient(rgba(${theme.palette.background.defaultChannel} /0.95), 
            //         rgba(${theme.palette.background.defaultChannel} / 1)), 
            //         url('${background}')`,
            //     backgroundSize: "initial",
            //     backgroundPosition: "center",
            //     backgroundRepeat: "no-repeat",
            //     backgroundPositionY: "0"
            // }}
        >
            <AppContent>
                {device == DEVICE.MOBILE ?
                    <ContentMobile/>
                    :
                    <ContentPC/>
                }
            </AppContent>
            {title.background && (
                <Box
                sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "600px",
                    zIndex: "-1",
                    background: `
                        linear-gradient(rgba(${theme.vars.palette.background.defaultChannel} / ${filter}), 
                        rgba(${theme.vars.palette.background.defaultChannel} / 1)), 
                        url('${title.background}')
                    `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundPositionY: "0"
                }}
            >
            </Box>
            )}
        </Box>
    )
}

export default Content;