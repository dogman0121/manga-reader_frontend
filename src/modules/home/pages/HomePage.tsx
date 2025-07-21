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
import HomePageHero from "../components/HomePageHero";
import { AppHeaderMobile } from "../../../layouts/app-layout/AppLayoutMobile";
import LogoIcon from "../../../components/LogoIcon";
import SearchIcon from '@mui/icons-material/Search';
import {v4 as uuid4} from "uuid";

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
                backgroundColor: theme.palette.background.paper,
                boxShadow: device == DEVICE.MOBILE ? "0px 0px 4px rgba(0, 0, 0, 0.4)" : undefined
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

function SectionPC({
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

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                ...sx
            }}
        >
            <Box>
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
            {titles.map(title => <ProgressItem key={uuid4()} title={title}/>)}
        </Carousel>
    )
}

function ProgressCarouselPC({titles}: {titles: Title[]}) {
    const theme = useTheme();
    return (
        <Carousel
            sx={{
                "& .carousel": {
                    py: theme.spacing(2),
                }
            }}
        >
            {titles.map(title => <ProgressItem key={uuid4()} title={title}/>)}
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
                key={uuid4()}
                sx={{
                    minWidth: "max(120px, calc((100% - 15px * 7) / 8))",
                }}
            />)}
        </Carousel>
    )

}

function TitlesCarouselPC({
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
                    py: theme.spacing(2),
                },
                ...sx
            }}
        >
            {titles.map(title => <TitleItem 
                title={title}
                key={uuid4()}
                sx={{
                    minWidth: "max(120px, calc((100% - 15px * 7) / 8))",
                }}
            />)}
        </Carousel>
    )
}

function UpdatesList({titles, sx}: {titles: Title[], sx?:SxProps}) {
    const theme = useTheme();

    const {device} = useDeviceDetect();

    const styles = device != DEVICE.MOBILE ? 
    {
        p: theme.spacing(2),
        bgcolor: theme.palette.background.paper,
        borderRadius: "8px",
    }: {

    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(2),
                ...sx
            }}
        >
            {titles.map(title => (
                <Box
                    key={uuid4()}
                    sx={{
                        ...styles,
                        display: "flex",
                        flexDirection: "row",
                        gap: theme.spacing(4),
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

function HomePagePC() {
    const theme = useTheme();
    
    return (
        <Box
            sx={{
                maxWidth: "1240px",
                mx: "auto"
            }}
        >
            <Box
                sx={{
                    px: "20px",
                }}
            >
                <HomePageHero />
                <Box
                    sx={{
                        mt: theme.spacing(5),
                        display: "flex",
                        flexDirection: "column",
                        gap: theme.spacing(5),
                    }}
                >
                    <SectionPC
                        title="Продолжить читать"
                        href="/history"
                    >
                        <ProgressCarouselPC titles={[...mockTitles, ...mockTitles]}/>
                    </SectionPC>
                    <SectionPC
                        title="Новинки"
                        href="/new"
                    >
                        <TitlesCarouselPC titles={[...mockTitles, ...mockTitles]} />
                    </SectionPC>
                    <SectionPC
                        title="Выбор редакции"
                        href="/favourites"
                    >
                        <TitlesCarouselPC titles={[...mockTitles, ...mockTitles]} />
                    </SectionPC>
                    <SectionPC
                        title="Законченные"
                        href="/ended"
                    >
                        <TitlesCarouselPC titles={[...mockTitles, ...mockTitles]} />
                    </SectionPC>
                    <SectionPC
                        title="Последние обновления"
                        href="/last-updates"
                    >
                        <UpdatesList 
                            titles={mockTitles} 
                            sx={{
                                py: theme.spacing(2)
                            }}
                        />
                    </SectionPC>
                </Box>
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
                    bgcolor: theme.palette.customBackgrounds.header
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