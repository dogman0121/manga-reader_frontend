import { Box, SxProps, Typography, useTheme } from "@mui/material";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import { mockTitles } from "../../../mocks/title.mock";
import TitleItem from "../../../components/TitleItem";
import { Children } from "react";
import Title from "../../titles/types/Title";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Poster from "../../../components/ui/Poster";
import ScrollContainer from 'react-indiana-drag-scroll'
import { Link } from "react-router-dom";
import SearchProvider from "../../../features/search/components/SearchProvider";
import { HomeRoutes } from "../HomeRouter";
import HomePageHero from "../components/HomePageHero";
import { AppHeaderMobile } from "../../../layouts/app-layout/AppLayoutMobile";
import LogoIcon from "../../../components/LogoIcon";
import SearchIcon from '@mui/icons-material/Search';

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
                    minWidth: "max(120px, calc((100% - 15px * 7) / 8))",
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
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.4)"
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

function Section({title, href, children, sx}: {title: string, href: string, children: React.ReactElement, sx?: SxProps}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                ...sx
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
                    <Typography 
                        fontSize={"20px"}
                        fontWeight={"600"} 
                        lineHeight={"22px"}
                    >
                        {title}
                    </Typography>
                    <ArrowForwardRoundedIcon sx={{width:"20px", height: "20px"}}/>
                </Box>
            </Link>
            {children}
        </Box>
    )
}

function SectionMobile({
    title, 
    href, 
    children, 
    sx
}: {
    title: string, 
    href: string, 
    children: React.ReactElement, 
    sx?: SxProps
}) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                ...sx
            }}
        >
            <Box
                sx={{
                    px: theme.spacing(2)
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
                        <Typography 
                            fontSize={"20px"}
                            fontWeight={"600"} 
                            lineHeight={"22px"}
                        >
                            {title}
                        </Typography>
                        <ArrowForwardRoundedIcon sx={{width:"20px", height: "20px"}}/>
                    </Box>
                </Link>
            </Box>
            {children}
        </Box>
    )
}

function ProgressCarouselMobile({titles}: {titles: Title[]}) {
    const theme = useTheme();
    return (
        <Carousel
            sx={{
                "& .carousel": {
                    p: theme.spacing(2)
                }
            }}
        >
            {titles.map(title => <ProgressItem title={title}/>)}
        </Carousel>
    )
}

function TitlesCarouselMobile({
    titles, 
    sx
}: {
    titles: Title[], 
    sx?: SxProps
}) {
    const theme = useTheme();

    return (
        <Carousel 
            sx={{
                "& .carousel": {
                    p: theme.spacing(2)
                },
                ...sx
            }}
        >
            {titles.map(title => <TitleItem 
                title={title}
                sx={{
                    minWidth: "max(120px, calc((100% - 15px * 7) / 8))",
                }}
            />)}
        </Carousel>
    )

}

function UpdatesList({titles, sx}: {titles: Title[], sx?:SxProps}) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(3),
                ...sx
            }}
        >
            {titles.map(title => (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: theme.spacing(4)
                    }}
                >
                    <Poster 
                        src={title.main_poster?.small || ""}
                        width="70px"
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                        }}
                    >
                        <Typography 
                            fontWeight={600}
                        >
                            {title.name}
                        </Typography>
                        <Typography
                            sx={{
                                mt: theme.spacing(1)
                            }}
                        >Том 1 Глава 2</Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}


function ProgressCarousel({titles}: {titles: Title[]}) {
    return (
        <Carousel
        >
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
                titles={[...mockTitles, ...mockTitles, ...mockTitles]} 
                sx={{
                    p: "0 20px",
                    "& .TitleItem": {
                        minWidth: "max(140px, min(150px, calc((100% - 15px * 8) / 9)))"
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
                    <ProgressCarousel titles={mockTitles} />
                </Section>
                <Section
                    title="Специально для вас"
                    href={HomeRoutes.RECOMMENDATIONS}
                >
                    <TitlesCarousel titles={[...mockTitles, ...mockTitles]}/>
                </Section>
            </Box>
        </Box>
    )
}

function HomePageMobile() {
    const theme = useTheme()

    return (
        <SearchProvider emptyQuery={false}>
            <AppHeaderMobile
                firstLine={
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <LogoIcon 
                            sx={{
                                width: "28px",
                                height: "28px"
                            }}
                        />
                        <SearchIcon 
                            sx={{
                                width: "26px",
                                height: "26px"
                            }}
                        />
                    </Box>
                }
                sx={{
                    bgcolor: theme.palette.background.default
                }}
            >

            </AppHeaderMobile>
            <HomePageHero />
            <Box
                sx={{
                    mt: theme.spacing(5),
                    display: "flex",
                    flexDirection: "column",
                    gap: theme.spacing(5)
                }}
            >
                <SectionMobile
                    title="Продолжить читать"
                    href="/history"
                >
                    <ProgressCarouselMobile titles={mockTitles}/>
                </SectionMobile>
                <SectionMobile
                    title="Новинки"
                    href="/new"
                >
                    <TitlesCarouselMobile titles={mockTitles} />
                </SectionMobile>
                <SectionMobile
                    title="Выбор редакции"
                    href="/favourites"
                >
                    <TitlesCarouselMobile titles={mockTitles} />
                </SectionMobile>
                <SectionMobile
                    title="Законченные"
                    href="/ended"
                >
                    <TitlesCarouselMobile titles={mockTitles} />
                </SectionMobile>
                <SectionMobile
                    title="Последние обновления"
                    href="/last-updates"
                >
                    <UpdatesList 
                        titles={mockTitles} 
                        sx={{
                            p: theme.spacing(2)
                        }}
                    />
                </SectionMobile>
            </Box>
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