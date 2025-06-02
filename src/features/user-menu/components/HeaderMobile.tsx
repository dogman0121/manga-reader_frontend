import { Box, useTheme, Typography } from "@mui/material";
import { useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import MobileDrawer from "../../../components/ui/MobileDrawer";
import SettingsMobile from "./SettingsMobile";


export default function HeaderMobile() {
    const theme = useTheme();

    const [settingsOpened, setSettingsOpened] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent:"end",
                color: theme.typography.subtitle1.color,
                p: "0 5px"
            }}
        >
            <Box
                onClick={() => {
                    setSettingsOpened(true)
                }}
                sx={{
                    display:"flex",
                }}
            >
                <SettingsIcon />
                <Typography
                    sx={{
                        ml: "3px",
                    }}
                >
                    Настройки
                </Typography>
            </Box>
            <MobileDrawer
                open={settingsOpened}
                onClose={() => {setSettingsOpened(false)}}
                anchor="right"
            >
                <SettingsMobile />
            </MobileDrawer>
        </Box>
    )
}