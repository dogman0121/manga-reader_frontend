import { useContext, useState } from "react";
import { EMPTY_USER } from "../../../types/User";
import UserContext from "../../../context/UserContext";
import { Avatar, Box, Button, Typography, Paper, DrawerProps,Popover, PopoverProps } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import useDeviceDetect from "../../../hooks/useDeviceDetect";
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import MobileDrawer from "../../../components/ui/MobileDrawer";
import AuthModal from "../../auth/components/AuthModal";
import { Checkbox } from "@mui/material";
import { getColorScheme } from "../../../utils/colorScheme";
import ThemeContext from "../../../context/ThemeContext";
import UserMenuContext from "../../../context/UserMenuContext";
import { deleteAccessToken, deleteRefreshToken } from "../../../utils/token";


function Settings() {
    const [ isDarkMode, setIsDarkMode ] = useState(getColorScheme() === "dark");

    const { setTheme } = useContext(ThemeContext);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Typography
                    sx={{
                        fontSize: "18px",
                        textAlign: "center"
                    }}
                >
                    Настройки
                </Typography>
                <Box
                    sx={{
                        mt: "5px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography>Тема</Typography>
                    <Checkbox 
                        checked={isDarkMode}
                        onChange={
                            (e: React.ChangeEvent<HTMLInputElement>) => { 
                                setIsDarkMode(e.target.checked);
                                e.target.checked ? setTheme("dark") : setTheme("light") 
                            }
                        }
                    />
                </Box>
            </Box>
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


function ExitButton() {
    const { setUser } = useContext(UserContext);

    const onLogout = () => {
        deleteAccessToken();
        deleteRefreshToken();
        setUser(EMPTY_USER);
    }

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
    const [authModalOpened, setAuthModalOpened] = useState(false);

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
                    onClick={() => {
                        setAuthModalOpened(true);
                    }}
                >
                    Войти
                </Button>
            </Box>
            <AuthModal 
                open={authModalOpened}
                onClose={setAuthModalOpened}
            />
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
                    {user !== EMPTY_USER ?
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
                <UserMenuContext.Provider
                    value={{
                        onClose: () => {
                            window.history.back();
                            window.history.back();
                            onClose ? onClose({}, "backdropClick") : null;
                        }
                    }}
                >
                    <UserMenu />
                </UserMenuContext.Provider>
                
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