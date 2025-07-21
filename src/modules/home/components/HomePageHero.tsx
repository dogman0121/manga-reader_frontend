import { Box, ThemeOptions, Typography, useTheme } from "@mui/material";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import { mockTitles } from "../../../mocks/title.mock";
import Poster from "../../../components/ui/Poster";
import AppButton from "../../../components/ui/AppButton";
import { Swiper, SwiperSlide } from 'swiper/react';
import "./styles.css"

import { Navigation, EffectFade, Autoplay, Pagination } from 'swiper/modules';
import Title from "../../titles/types/Title";
import { Link } from "react-router-dom";


function HeroBlockMobile({title}: {title: Title}) {
    const theme = useTheme()

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                pb: theme.spacing(5)
            }}
        >
            <Box
                sx={{
                    background: `
                        linear-gradient(
                        rgba(${theme.palette.background.defaultChannel} / 0.8), 
                        rgba(${theme.palette.background.defaultChannel} / 0.8)
                        ),
                        url(${title.background ? title.background : title.main_poster?.large})
                    `,
                    backgroundSize: 'cover',
                    backgroundPositionX: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >   
                <Box
                    sx={{
                        pt: "50px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Poster 
                        src={title.main_poster?.medium || ""}
                        style={{
                            maxWidth: "160px",
                        }}
                    />
                    <Box
                        sx={{
                            mt: theme.spacing(3),
                            display: "flex",
                            flexDirection: "row",
                            gap: theme.spacing(1)
                        }}
                    >
                        <Typography
                            variant="caption"
                            fontSize={"16px"}
                            lineHeight={1}
                        >
                            {title.type?.name}
                        </Typography>
                        <Typography
                            variant="caption"
                            fontSize={"16px"}
                            lineHeight={1}
                        >
                            {title.year}
                        </Typography>
                    </Box>
                    <Typography
                        fontSize="24px"
                        fontWeight= "600"
                        lineHeight= "1.2"
                        sx={{
                            height: "2.4em",
                            width: "100%",
                            textAlign: "center",
                            background: `
                                linear-gradient(
                                rgba(${theme.palette.background.defaultChannel} / 0), 
                                rgba(${theme.palette.background.defaultChannel} / 1)
                                )
                            `
                        }}
                    >
                        {title.name}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    my: theme.spacing(3),
                    px: theme.spacing(2)
                }}
            >
                <Link
                    to={`/manga/${title.slug}`}
                >
                    <AppButton
                        variant="contained"
                        sx={{
                            width: "100%",
                        }}
                    >
                        Читать
                    </AppButton>
                </Link>
            </Box>
        </Box>
    )
}


function HeroBlockPC({title}: {title: Title}) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                background: `
                    linear-gradient(
                    rgba(${theme.palette.background.defaultChannel} / 0.8), 
                    rgba(${theme.palette.background.defaultChannel} / 0.8)
                    ),
                    url(${title.background ? title.background : title.main_poster?.large})
                `,
                backgroundSize: 'cover',
                backgroundPositionX: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Box
                sx={{
                    py: theme.spacing(20),
                    maxWidth: "860px",
                    mx: "auto",

                    display: "flex",
                    flexDirection: "row",
                    gap: "50px",
                    alignItems: "center"
                }}
            >
                <Poster 
                    src={title.main_poster?.medium || ""}
                    style={{
                        maxWidth: "200px"
                    }}
                />
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: theme.spacing(2)
                        }}
                    >
                        <Typography 
                            fontSize={"16px"}
                            variant="caption"
                        >
                            {title.type?.name}
                        </Typography>
                        <Typography 
                            fontSize={"16px"}
                            variant="caption"
                        >
                            {title.year}
                        </Typography>
                    </Box>
                    <Typography
                        fontSize={"24px"}
                        fontWeight={600}
                        lineHeight={"1"}
                    >
                        {title.name}
                    </Typography>
                    <Typography
                        fontSize={"16px"}
                        lineHeight={"1.5"}
                        sx={{
                            mt: theme.spacing(4),
                            height: "7.5em",
                            display: "-webkit-box",
                            WebkitLineClamp: "5",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {title.description}
                    </Typography>
                    <Link
                        to={`/manga/${title.slug}`}
                        style={{
                            marginTop: theme.spacing(3)
                        }}
                    >
                        <AppButton
                            variant="contained"
                            sx={{
                                mt: theme.spacing(3),
                                width: "150px",
                                height: "45px"
                            }}
                        >
                            Читать
                        </AppButton>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

function HomePageHeroPC() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                "& .swiper-pagination-bullet": {
                    bgcolor: `${theme.palette.secondary.main}`,
                    opacity: "1",
                    width: "25px",
                    height: "8px",
                    borderRadius: "8px" 
                },
                "& .swiper-pagination-bullet-active": {
                    bgcolor: theme.palette.primary.main,
                    width: "40px"
                },
            }}
        >
            <Swiper
                modules={[Navigation, EffectFade, Pagination, Autoplay]}
                pagination={{
                    clickable: true
                }}
                speed={800}
                effect={"fade"}
                loop
                allowTouchMove={false}
                autoplay={{
                    delay: 5000
                }}
            >
                <SwiperSlide><HeroBlockPC title={mockTitles[0]}/></SwiperSlide>
                <SwiperSlide><HeroBlockPC title={mockTitles[1]}/></SwiperSlide>
                <SwiperSlide><HeroBlockPC title={mockTitles[2]}/></SwiperSlide>
                <SwiperSlide><HeroBlockPC title={mockTitles[3]}/></SwiperSlide>
                <SwiperSlide><HeroBlockPC title={mockTitles[4]}/></SwiperSlide>
            </Swiper>
        </Box>
    )
}

function HomePageHeroMobile() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                "& .swiper-pagination-bullet": {
                    bgcolor: `${theme.palette.secondary.main}`,
                    opacity: "1",
                    width: "25px",
                    height: "8px",
                    borderRadius: "8px" 
                },
                "& .swiper-pagination-bullet-active": {
                    bgcolor: theme.palette.primary.main,
                    width: "40px"
                },
            }}
        >
            <Swiper
                modules={[EffectFade, Pagination, Autoplay]}
                pagination={{
                    clickable: true
                }}
                speed={800}
                effect={"fade"}
                loop
                allowTouchMove={false}
                autoplay={{
                    delay: 5000
                }}
            >
                <SwiperSlide><HeroBlockMobile title={mockTitles[0]}/></SwiperSlide>
                <SwiperSlide><HeroBlockMobile title={mockTitles[1]}/></SwiperSlide>
                <SwiperSlide><HeroBlockMobile title={mockTitles[2]}/></SwiperSlide>
                <SwiperSlide><HeroBlockMobile title={mockTitles[3]}/></SwiperSlide>
                <SwiperSlide><HeroBlockMobile title={mockTitles[4]}/></SwiperSlide>
            </Swiper>
        </Box>
    )
}


export default function HomePageHero() {
    const {device} = useDeviceDetect()


    return (
        <>
            {device == DEVICE.MOBILE && <HomePageHeroMobile />}
            {device == DEVICE.PAD && <HomePageHeroPC />}
            {device == DEVICE.PC && <HomePageHeroPC />}
        </>
    )
}