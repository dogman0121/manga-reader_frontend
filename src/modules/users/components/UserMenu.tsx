import { Avatar, Box, Divider, DrawerProps, Popover, PopoverProps, Typography } from "@mui/material"
import { useContext } from "react"
import UserAuthContext from "../../../context/UserAuthContext"
import NotificationsIcon from '@mui/icons-material/Notifications';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AppButton from "../../../components/ui/AppButton";
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import MobileDrawer from "../../../components/ui/MobileDrawer";


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
                bgcolor: "#323232",
                borderRadius: "8px"
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
    text
}:{
    icon: React.ReactElement,
    text: string
}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                borderRadius: "8px",
                p: "7px 10px",
                "&:hover": {
                    bgcolor: "#323232"
                }
            }}
        >
            {icon}
            <Typography>{text}</Typography>
        </Box>
    )
}

function MenuInner() {
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
                <Option 
                    icon={<NotificationsIcon sx={{width: "20px", height: "20px"}}/>}
                    text={"Уведомления"}
                />
                <Option 
                    icon={<HistoryRoundedIcon sx={{width: "20px", height: "20px"}}/>}
                    text={"История просмотров"}
                />
                <Option 
                    icon={<AddRoundedIcon sx={{width: "20px", height: "20px"}}/>}
                    text={"Добавить контент"}
                />
            </Box>
            <Divider/>
            <Box>
                <Option 
                    icon={<SettingsRoundedIcon sx={{width: "20px", height: "20px"}}/>}
                    text={"Настройки"}
                />
                <Option 
                    icon={<LightModeRoundedIcon sx={{width: "20px", height: "20px"}}/>}
                    text={"Тема"}
                />
            </Box>
            <Divider />
            <AppButton 
                color="error"
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
            elevation={2}
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