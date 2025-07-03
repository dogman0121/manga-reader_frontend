import { Box, Divider, SxProps, Typography, useTheme } from "@mui/material";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import { titles } from "../../../mocks/title.mock";
import TitleItem from "../../../components/TitleItem";
import { Children, useState } from "react";
import Title from "../../titles/types/Title";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Poster from "../../../components/ui/Poster";
import ScrollContainer from 'react-indiana-drag-scroll'
import { Link } from "react-router-dom";
import { SearchInputDisabled } from "../../../features/search/components/SearchInput";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import SearchModal from "../../../features/search/components/SearchModal";
import SearchProvider from "../../../features/search/components/SearchProvider";
import { HomeRoutes } from "../HomeRouter";

function Carousel({children, sx}: {children: React.ReactElement[], sx?: SxProps}) {
    return (
        <Box
            sx={{
                ...sx
            }}
        >
            <ScrollContainer
                horizontal
                className="carousel"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "15px",
                }}
            >
                {Children.map(children, child => (
                    child
                ))}
            </ScrollContainer>
        </Box>
    )
}

function TitlesCarousel({
    titles, 
    sx
}: {
    titles: Title[], 
    sx?: SxProps
}) {
    return (
        <Carousel sx={{...sx}}>
            {titles.map(title => <TitleItem 
                title={title}
                sx={{
                    width: "140px"
                }}
            />)}
        </Carousel>
    )

}

function ProgressItem({title}: {title: Title}) {
    const theme = useTheme()
    
    const {device} = useDeviceDetect();
    
    return (
        <Box
            sx={{
                p: theme.spacing(2),
                borderRadius: "12px",
                minWidth: "340px",
                display: "flex",
                flexDirection: "row",
                gap: theme.spacing(3),
                backgroundColor: device != DEVICE.MOBILE ? theme.palette.background.paper : undefined,
                border: device == DEVICE.MOBILE 
                    ? `1px solid rgba(${theme.palette.mode == "dark" ? "255, 255, 255" : "0, 0, 0"}, 0.23)`
                    : undefined 
            }}
        >
            <Poster 
                src={title.main_poster?.medium || ""}
                width="70px"
            />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    py: "10px",
                    width: "100%"
                }}
            >
                <Typography>{title.name}</Typography>
                <Box>
                    <Typography variant="caption">Глава 1 из 29</Typography>
                    <Box 
                        sx={{
                            width: "100%",
                            bgcolor: theme.palette.secondary.main,
                            borderRadius: "10px",
                            height: "10px",
                            mt: "5px"
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}

function Section({title, href, children}: {title: string, href: string, children: React.ReactElement}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px"
            }}
        >
            <Link to={href}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "5px",
                        "&:hover": {
                            textDecoration: "underline"
                        }
                    }}
                >
                    <Typography fontSize={"16px"} lineHeight={"22px"}>
                        {title}
                    </Typography>
                    <ArrowForwardRoundedIcon sx={{width:"20px", height: "20px"}}/>
                </Box>
            </Link>
            {children}
        </Box>
    )
}

function ProgressCarousel({titles}: {titles: Title[]}) {
    return (
        <Carousel>
            {titles.map(title => <ProgressItem title={title}/>)}
        </Carousel>
    )
}

function HomePagePC() {
    
    return (
        <Box
            sx={{
                pt: "35px",
                pb: "25px"
            }}
        >
            <TitlesCarousel
                titles={[...titles, ...titles, ...titles]} 
                sx={{
                    p: "0 20px",
                    "& .TitleItem": {
                        width: "160px"
                    }
                    
                }}
            />
            <Box
                sx={{
                    maxWidth: "1240px",
                    padding: "0 20px",

                    margin: "0 auto",
                    mt: "25px",

                    display: "flex",
                    flexDirection: "column",
                    gap: "25px"
                }}
            >
                <Section 
                    title="Продолжить чтение"
                    href="/"
                >
                    <ProgressCarousel titles={titles} />
                </Section>
                <Section
                    title="Специально для вас"
                    href={HomeRoutes.RECOMMENDATIONS}
                >
                    <TitlesCarousel titles={[...titles, ...titles]}/>
                </Section>
            </Box>
        </Box>
    )
}

function HomePageMobile() {
    const [modalOpened, setModalOpened] = useState(false);

    return (
        <SearchProvider emptyQuery={false}>
            <Box
                sx={{
                    p: "15px 10px"
                }}
            >
                <SearchInputDisabled 
                    onClick={() => setModalOpened(true)}
                    placeholder="Быстрый поиск"
                />
            </Box>
            <Divider />
            <AppContent>
                <Box
                    sx={{  
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px"
                    }}
                >
                    <TitlesCarousel
                        titles={[...titles, ...titles, ...titles]} 
                        sx={{
                            "& .TitleItem": {
                                width: "160px"
                            },
                            
                            
                        }}
                    />
                    <Section 
                        title="Продолжить чтение"
                        href="/"
                    >
                        <ProgressCarousel titles={titles} />
                    </Section>
                    <Section
                        title="Специально для вас"
                        href={HomeRoutes.RECOMMENDATIONS}
                    >
                        <TitlesCarousel titles={[...titles, ...titles]}/>
                    </Section>
                </Box>
                <SearchModal open={modalOpened} onClose={() => setModalOpened(false)}/>
            </AppContent>
        </SearchProvider>
        
    )
}

export default function HomePage() {
    const { device } = useDeviceDetect();

    return (
        <>
            {device == DEVICE.MOBILE && <HomePageMobile />}
            {device == DEVICE.PC && <HomePagePC />}
            {device == DEVICE.PAD && <HomePagePC />}
        </>
    )
}