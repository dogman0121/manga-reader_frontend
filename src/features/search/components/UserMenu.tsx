import { useContext, useState } from "react";
import { EmptyUser } from "../../../types/User";
import UserContext from "../../../context/UserContext";
import { Avatar, Box, Button, Typography, Paper, DrawerProps,Popover, PopoverProps } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import MobileDrawer from "./ui/MobileDrawer";


function Settings() {
    return (
        <>
            Првие
        </>
    )
}

function HeaderMobile() {
    const theme = useTheme();

    const [settingsOpened, setSettingsOpened] = useState(false);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent:"end",
                color: theme.typography.subtitle1.color
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
                <Settings />
            </MobileDrawer>
        </Box>
    )
}


function UserWidget() {
    const { user } = useContext(UserContext);

    const theme = useTheme();

    return (
        <>
            <Link to={`/profile/${user.id}`}>
                <Paper
                    sx={{
                        padding: "10px",
                        borderRadius: "12px",
                        boxShadow: 3,
                        bgcolor: theme.palette.customBackgrounds?.widget,
                        display: "flex"
                    }}
                >
                    <Avatar src={user.avatar} />
                    <Box
                        sx={{
                            ml: "10px"
                        }}
                    >
                        <Typography>{user.login}</Typography>
                    </Box>
                </Paper>
            </Link>
        </>
    )
}


function ExitButton({ onLogout }: { onLogout?: React.ReactEventHandler<HTMLButtonElement> }) {
    return (
        <Button
            sx={{
                width: "100%",
                borderRadius: "10px",
                textTransform: "none",
                fontSize: "15px"
            }}
            color="error"
            variant="text"
            onClick={onLogout}
        >
            <ExitToAppIcon fontSize="small"/> 
            <Typography 
                sx={{
                    ml: "5px"
                }}
            >
                Выход
            </Typography>
        </Button>
    )
}


function AnonymusMenu() {
    return (
        <>
            <HeaderMobile />
            <Box
                sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",

                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Box
                    sx={{
                        textAlign: "center"
                    }}
                >
                    Войдите в аккаунт
                </Box>
                <Button 
                    variant="contained"
                    sx={{
                        mt: "10px"
                    }}
                >
                    Войти
                </Button>
            </Box>
        </>
    )
} 

function UserMenuMobile() {
    return (
        <>
            <HeaderMobile />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "8px",
                    mt: 2,
                }}
            >
                <UserWidget />
                <ExitButton />
            </Box>
        </>
    )
}

function UserMenuPC() {
    return (
        <>
            <UserWidget />
            <ExitButton />
        </>
    )
}

function UserMenu(){
    const { user } = useContext(UserContext);

    const { device } = useDeviceDetect()

    return (
        <>
            {device === "mobile" ?
                <>
                    {user !== EmptyUser ?
                        <UserMenuMobile />
                        :
                        <AnonymusMenu />
                    }
                </>
                :
                <UserMenuPC />
            }
        </>
    )
}


export function UserMenuDrawer({open, onClose}: DrawerProps) {
    return (
        <>
            <MobileDrawer
                open={open}
                onClose={onClose}
                anchor="right"
            >
                <UserMenu />
            </MobileDrawer>
        </>
    )
}

export function UserMenuPopover({open, onClose, anchorEl}: PopoverProps) {
    return (
        <>
            <Popover
                open={open}
                onClose={onClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                sx={{
                    mt:"10px",
                    ".MuiPaper-root": {
                        borderRadius: "12px",
                    }
                }}
            >   
                <Box
                    sx={{
                        width: "250px",
                        padding: "10px",
                    }}
                >
                    <UserMenu />
                </Box>
            </Popover>
        </>
    )
}