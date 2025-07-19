import { Box, Typography, useTheme } from "@mui/material";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import { mockTitle } from "../../../mocks/title.mock";
import Poster from "../../../components/ui/Poster";
import AppButton from "../../../components/ui/AppButton";
import { range } from "lodash";

function HomePageHeroMobile() {
    const theme = useTheme();

    return(
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(3),
            }}
        >
            <Box
                sx={{
                    background: `
                        linear-gradient(
                        rgba(${theme.palette.background.defaultChannel} / 0.8), 
                        rgba(${theme.palette.background.defaultChannel} / 0.8)
                        ),
                        url(${mockTitle.background ? mockTitle.background : mockTitle.main_poster?.large})
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
                        src={mockTitle.main_poster?.medium || ""}
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
                            {mockTitle.type?.name}
                        </Typography>
                        <Typography
                            variant="caption"
                            fontSize={"16px"}
                            lineHeight={1}
                        >
                            {mockTitle.year}
                        </Typography>
                    </Box>
                    <Typography
                        fontSize="24px"
                        fontWeight= "600"
                        lineHeight= "1.2"
                        sx={{
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
                        {mockTitle.name}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    px: theme.spacing(2)
                }}
            >
                <AppButton
                    variant="contained"
                    sx={{
                        width: "100%",
                        py: theme.spacing(1)
                    }}
                >
                    Читать
                </AppButton>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: theme.spacing(1),
                    justifyContent: "center",
                    pb: theme.spacing(3)
                }}
            >
                {
                    range(0, 5).map(ind => (
                        <Box
                            key={ind}
                            sx={{
                                bgcolor: theme.palette.secondary.main,
                                width: "25px",
                                height: "8px",
                                borderRadius: "8px"
                            }}
                        />
                    ))
                }
            </Box>
        </Box>
    )
}

function HomePageHeroPC() {
    return (
        <></>
    )
}

export default function HomePageHero() {
    const {device} = useDeviceDetect()


    return (
        <>
            {device == DEVICE.MOBILE && <HomePageHeroMobile />}
            {device == DEVICE.PC && <HomePageHeroPC />}
            {device == DEVICE.PAD && <HomePageHeroPC />}
        </>
    )
}