import { useEffect, useState } from "react";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect"
import { useParams } from "react-router-dom";
import Title from "../../../pages/title/types/Title";
import { titleService } from "../service/api/titleService";
import TitleProvider from "../components/TitleProvider";
import PageLoader from "../../../components/ui/PageLoader";
import NotFound from "../../../pages/not-found/NotFound";
import { Box, useTheme } from "@mui/material";
import useTitle from "../hooks/useTitle";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import Poster from "../../../components/ui/Poster";
import Names from "../components/Names";
import About from "../components/About";
import Stats from "../components/Stats";
import GenresList from "../components/GenresList";
import OtherNames from "../components/OtherNames";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Chapters from "../components/Chapters";
import Comments from "../components/Comments";
import OpenGraphMeta from "../../../components/OpenGraphMeta";
import { generatePath, TitleRoutes } from "../../../routes";
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Similar from "../../../pages/title/components/Similar";


function TitlePagePC() {
    const theme= useTheme();

    const { title } = useTitle();

    const [section, setSection] = useState<string>('1');
        
    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };

    if (!title)
        return null;

    return (
        <Box>
            <AppContent>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: theme.spacing(4)
                    }}
                >
                    <Box
                        sx={{
                            minWidth: "150px",
                            maxWidth: "220px",
                            width: "100%"
                        }}
                    >
                        <Poster src={title.main_poster?.medium || ""} />
                    </Box>
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: "955px",
                            minWidth: "400px",
                            position: "relative",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: theme.spacing(4)
                            }}
                        >
                            <Names />
                            <Stats />
                            <About />
                            <GenresList />
                            <OtherNames />
                            <TabContext value={section}>
                                <TabList onChange={handleChange}>
                                    <Tab label="Главы" value="1" sx={{fontSize: "14px"}}/>
                                    <Tab label="Комментарии" value="2" sx={{fontSize: "14px"}}/>
                                </TabList>
                                <TabPanel value="1" sx={{p: "0"}}><Chapters /></TabPanel>
                                <TabPanel value="2" sx={{p: "0"}}><Comments /></TabPanel>
                            </TabContext>
                        </Box>
                    </Box>
                </Box>
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
                        linear-gradient(rgba(${theme.palette.background.defaultChannel} / 0.9), 
                        rgba(${theme.palette.background.defaultChannel} / 1)), 
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

function TitlePageMobile() {
    const {title} = useTitle();

    const theme = useTheme();

    const [section, setSection] = useState<string>('1');
        
    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };

    if (!title)
        return null;

    return (
        <AppContent>
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <WestRoundedIcon />
                    <MoreVertRoundedIcon />
                </Box>
                <Box
                    sx={{
                        mt: theme.spacing(7)
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            display: "flex",
                            margin: "0 auto",

                            minWidth: "160px",
                            maxWidth: "200px",
                            width: "50%"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "absolute",
                                right: 0,
                                top: 0,
                                transform: "translate(30%, -30%)",

                                width: "40px",
                                height: "40px",

                                borderRadius: "50%",
                                background: "#FF0000",
                                fontSize: "24px",
                                color: "#FFFFFF"
                            }}
                        >
                            10
                        </Box>
                        <Poster 
                            src={title.main_poster?.medium || ""}
                        />
                    </Box>
                </Box>
                <Names 
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"

                    }}
                />
                <Stats 
                    sx={{
                        mt: theme.spacing(4),
                        columnGap: theme.spacing(5),
                        justifyContent: "center"
                    }}
                />
                <TabContext value={section}>
                    <TabList onChange={handleChange} sx={{mt: theme.spacing(4)}}>
                        <Tab label="Информация" value="1" sx={{fontSize: "14px"}}/>
                        <Tab label="Главы" value="2" sx={{fontSize: "14px"}}/>
                        <Tab label="Комментарии" value="3" sx={{fontSize: "14px"}}/>
                    </TabList>
                    <TabPanel value="1" sx={{p: `${theme.spacing(3)} 0`}}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: theme.spacing(3)
                            }}
                        >
                            <About />
                            <GenresList />
                            <OtherNames />
                            <Similar />
                        </Box>
                    </TabPanel>
                    <TabPanel value="2" sx={{p: `${theme.spacing(3)} 0`}}><Chapters /></TabPanel>
                    <TabPanel value="3" sx={{p: `${theme.spacing(3)} 0`}}><Comments /></TabPanel>
                </TabContext>
            </Box>
            <Box>

            </Box>
        </AppContent>
    )
}


export default function TitlePage() {
    const {device} = useDeviceDetect();

    const {titleId} = useParams();

    const [title, setTitle] = useState<Title | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        setIsLoading(true);

        titleService.fetchTitle(parseInt(titleId || ""))
        .then(({data}) => {
            if (data)
                setTitle(data);
            else
                setTitle(null)
            setIsLoading(false);
        })
        
        return () => {}
    }, [titleId])

    if (isLoading)
        return <PageLoader />
    
    if (title == null)
        return <NotFound />

    return (
        <>
            <OpenGraphMeta 
                title={`Читать ${title.type?.name} ${title.name} онлайн | kanwoo`}
                url={generatePath(TitleRoutes.INDEX, {titleId: title.id})}
                image={title.main_poster?.small || ""}
                description={title.description || ""}

            />
            <TitleProvider title={title} setTitle={setTitle}>
                {device == DEVICE.MOBILE && <TitlePageMobile />}
                {device == DEVICE.PAD && <TitlePagePC/>}
                {device == DEVICE.PC && <TitlePagePC/>}
            </TitleProvider>
        </>
    )
}