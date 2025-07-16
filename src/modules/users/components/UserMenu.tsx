import { Avatar, Box, Divider, DrawerProps, Popover, PopoverProps, Typography } from "@mui/material"
import React, { useContext } from "react"
import UserAuthContext from "../../../context/UserAuthContext"
import NotificationsIcon from '@mui/icons-material/Notifications';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AppButton from "../../../components/ui/AppButton";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import MobileDrawer from "../../../components/ui/MobileDrawer";
import { getColorScheme } from "../../../utils/colorScheme";
import ThemeContext from "../../../context/ThemeContext";
import { Link } from "react-router-dom";
import { authService } from "../../../features/auth/services/api/authService";

function UserWidget() {
    const {user: currentUser} = useContext(UserAuthContext);

    if (!currentUser) return null;

    return (
        <Box
            sx={{
                p: "6px 8px",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                bgcolor: getColorScheme() == "dark" ? "#2e2e2e" : "#F6F6F6",
                borderRadius: "8px",
                cursor: "pointer",
            }}
        >
            <Avatar variant="square" src={currentUser.avatar} sx={{borderRadius: "4px"}}/>
            <Box>
                <Typography 
                    variant="caption"
                    sx={{
                        textDecoration: "underline"
                    }}    
                >
                    Мой профиль
                </Typography>
                <Typography>
                    {currentUser.login}
                </Typography>
            </Box>
        </Box>
    )
}

function Option({
    icon,
    text,
    endAdornment,
    onClick
}:{
    icon: React.ReactElement,
    text: string,
    endAdornment?: React.ReactElement,
    onClick?: () => void
}) {
    return (
        <Box
            onClick={onClick}
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "8px",
                cursor: "pointer",
                p: "7px 10px",
                "&:hover": {
                    bgcolor: getColorScheme() == "dark" ? "#2e2e2e" : "#F6F6F6"
                }
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                {icon}
                <Typography>{text}</Typography>
            </Box>
            {endAdornment}
        </Box>
    )
}

function MenuInner() {
    const {setTheme} = useContext(ThemeContext)

    const {setUser} = useContext(UserAuthContext);

    const handleSwitchTheme = () => {
        if (getColorScheme() == "dark")
            return setTheme("light")
        return setTheme("dark")
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
            }}
        >
            <UserWidget />
            <Divider/>
            <Box>
                <Link to="/notifications">
                    <Option 
                        icon={<NotificationsIcon sx={{width: "20px", height: "20px"}}/>}
                        text={"Уведомления"}
                    />
                </Link>
                <Link to="/history">
                    <Option 
                        icon={<HistoryRoundedIcon sx={{width: "20px", height: "20px"}}/>}
                        text={"История просмотров"}
                    />
                </Link>
                
                <Option 
                    icon={<AddRoundedIcon sx={{width: "20px", height: "20px"}}/>}
                    text={"Добавить контент"}
                />
            </Box>
            <Divider/>
            <Box>
                <Link to="/users/settings">
                    <Option 
                        icon={<SettingsRoundedIcon sx={{width: "20px", height: "20px"}}/>}
                        text={"Настройки"}
                    />
                </Link>
                
                <Option 
                    icon={<LightModeRoundedIcon sx={{width: "20px", height: "20px"}}/>}
                    text={"Тема"}
                    endAdornment={
                        <Typography variant="caption">
                            {getColorScheme() == "dark" ? "темная" : "светлая"}
                        </Typography>
                    }
                    onClick={handleSwitchTheme}
                />
            </Box>
            <Divider />
            <AppButton 
                color="error"
                onClick={() => {
                    authService.logout()
                    setUser(null);
                }}
                sx={{
                    textTransform: "capitalize",
                    display: "flex",
                    gap: "5px"
                }}
            >
                <ExitToAppRoundedIcon sx={{width: "20px", height: "20px"}}/>
                Выйти
            </AppButton>
        </Box>
    )
}


export function UserMenuPopover({sx, ...props}: PopoverProps) {
    return (
        <Popover
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            sx={{
                mt: "5px",
                "& .MuiPaper-root": {
                    width: "250px",
                    p: "10px",
                    borderRadius: "12px",
                },
                ...sx
            }}
            elevation={1}
            {...props}
        >
            <MenuInner />
        </Popover>
    )
}

export function UserMenuDrawer({...props}: DrawerProps) {
    return (
        <MobileDrawer
            anchor="right"
            {...props}
        >
            <MenuInner />
        </MobileDrawer>
    )
}