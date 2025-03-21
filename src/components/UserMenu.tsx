import { useContext, useState } from "react";
import { EMPTY_USER } from "../types/User";
import UserContext from "../context/UserContext";
import { 
    Avatar, 
    Box, 
    Button, 
    Typography, 
    DrawerProps,
    Popover, 
    PopoverProps, 
    Accordion,
    AccordionSummary, 
    AccordionDetails,
    Divider, 
} from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { DEVICE, useDeviceDetect } from "../hooks/useDeviceDetect";
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import MobileDrawer from "./ui/MobileDrawer";
import { Checkbox } from "@mui/material";
import { getColorScheme } from "../utils/colorScheme";
import ThemeContext from "../context/ThemeContext";
import UserMenuContext from "../context/UserMenuContext";
import { deleteAccessToken, deleteRefreshToken } from "../utils/token";
import Widget from "./ui/Widget";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { AuthContext } from "../features/auth/context/AuthContext";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';


const buttonWidgetStyle = {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
}


function ThemeSetting() {
    const [ isDarkMode, setIsDarkMode ] = useState(getColorScheme() === "dark");

    const { setTheme } = useContext(ThemeContext);

    return (
        <Box
            sx={buttonWidgetStyle}
        >
            <Typography>Тема</Typography>
            <Checkbox 
                sx={{
                    padding: 0
                }}
                checked={isDarkMode}
                onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => { 
                        setIsDarkMode(e.target.checked);
                        e.target.checked ? setTheme("dark") : setTheme("light") 
                    }
                }
            />
        </Box>
    )
}

function SettingsMobile() {
    const theme = useTheme();

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px 5px",
                    height: "100%",
                    bgcolor: theme.palette.customBackgrounds?.widget3
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
                        mt: "15px",
                        display: "flex",
                        flexDirection:"column",
                        rowGap: "7px"
                    }}
                >
                    <Widget><ThemeSetting /></Widget>
                </Box>
            </Box>
        </>
    )
}

function SettingsPC() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                p: "4px 6px",
                bgcolor: theme.palette.customBackgrounds?.widget2,
                alignItems: "center",
                borderRadius: "6px"
            }}
        >
            <Accordion
                sx={{
                    bgcolor: "transparent",
                    backgroundImage: "none",
                    boxShadow: "none",
                    width: "100%"
                }}
            >
                <AccordionSummary
                    expandIcon={<KeyboardArrowDownRoundedIcon/>}
                    sx={{
                        p: "5px 0",
                        minHeight: 0,

                        "&.Mui-expanded": {
                            minHeight: 0
                        },

                        "& .MuiAccordionSummary-content": {
                            m: 0,
                        },

                        "& .MuiAccordionSummary-content.Mui-expanded": {
                            m: 0
                        }
                    }}
                >
                    <SettingsIcon 
                        sx={{
                            width: "20px",
                            color: theme.typography.subtitle1.color
                        }}/>
                    <Typography sx={{ml: "3px"}}>Настройки</Typography>
                
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        p: "0 0 0 10px",
                        display: "flex",
                        flexDirection: "row"
                    }}
                >
                    <Divider orientation="vertical" variant="middle" flexItem/>
                    <Box
                        sx={{
                            p: "5px 5px 5px 10px",
                            width: "100%"
                        }}
                    >
                        <ThemeSetting />
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
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

function UserWidgetMobile() {
    const { user } = useContext(UserContext);

    const {onClose} = useContext(UserMenuContext);

    const theme = useTheme();

    return (
        <>
            <Link to={`/profile/${user.id}`}>
                <Widget
                    sx={{
                        p: "15px 12px"
                    }}
                >
                    <Avatar 
                        src={user.avatar} 
                        variant="square"
                        sx={{
                            width: "46px",
                            height: "46px",
                            borderRadius: "8px"
                        }}
                    />
                    <Box
                        sx={{
                            ml: "15px"
                        }}
                    >
                        <Typography>{user.login}</Typography>
                        <Typography
                            sx={{
                                fontSize: "13px",
                                color: theme.typography.subtitle1.color,
                                textDecoration: "underline"
                            }}
                            onClick={() => {
                                onClose();
                            }}
                        >
                            в профиль
                        </Typography>
                    </Box>
                </Widget>
            </Link>
        </>
    )
}

function UserWidgetPC() {
    const { user } = useContext(UserContext);

    const {onClose} = useContext(UserMenuContext);

    const theme = useTheme();

    return (
        <>
            <Link to={`/profile/${user.id}`}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        p: "4px 6px",
                        bgcolor: theme.palette.customBackgrounds?.widget2,
                        alignItems: "center",
                        borderRadius: "6px"
                    }}
                >
                    <Avatar 
                        src={user.avatar} 
                        variant="square"
                        sx={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "8px"
                        }}
                    />
                    <Box
                        sx={{
                            ml: "15px"
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "13px",
                                color: theme.typography.subtitle1.color,
                                textDecoration: "underline"
                            }}
                            onClick={() => {
                                onClose();
                            }}
                        >
                            Мой профиль
                        </Typography>
                        <Typography>{user.login}</Typography>
                    </Box>
                </Box>
            </Link>
        </>
    )
}


function ExitButton() {
    const { setUser } = useContext(UserContext);

    const { onClose } = useContext(UserMenuContext);

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
            onClick={() => {onLogout(); onClose()}}
        >
            <ExitToAppIcon fontSize="small"/> 
            <Box
                sx={{
                    ml: "5px"
                }}
            >
                Выход
            </Box>
        </Button>
    )
}

function AddMangaButton() {
    const { onClose } = useContext(UserMenuContext);

    return (
        <Link to="/manga/add">
            <Widget
                onClick={() => {
                    onClose();
                }}
            >
                <Box
                    sx={{
                        ...buttonWidgetStyle
                    }}
                >
                    Добавить тайтл
                    <AddRoundedIcon />
                </Box>
            </Widget>
        </Link>
    )
}


function AnonymusMenu() {
    const { openModal } = useContext(AuthContext);

    const theme = useTheme()

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    padding: "10px 5px",
                    bgcolor: theme.palette.background.default,
                }}
            >
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
                        alignItems: "center",
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
                            openModal();
                        }}
                    >
                        Войти
                    </Button>
                </Box>
            </Box>
        </>
    )
} 

function UserMenuMobile() {
    const theme = useTheme();

    return (
        <>
            <Box
                sx={{
                    padding: "10px 5px",
                    height: "100%",
                    bgcolor: theme.palette.customBackgrounds?.widget3
                }}
            >
                <HeaderMobile />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "7px",
                        mt: 2,
                    }}
                >
                    <UserWidgetMobile />
                    <AddMangaButton />
                    <ExitButton />
                </Box>
            </Box>
        </>
    )
}

function UserMenuPC() {
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "7px",
                }}
            >
                <UserWidgetPC />
                <SettingsPC />
                <ExitButton />
            </Box>
        </>
    )
}

function UserMenu(){
    const { user } = useContext(UserContext);

    const device = useDeviceDetect()

    return (
        <>
            {device === DEVICE.MOBILE ?
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
                    <UserMenuContext.Provider
                        value={{
                            onClose: () => {
                                onClose ? onClose({}, "backdropClick") : null;
                            }
                        }}
                    >
                        <UserMenu />
                    </UserMenuContext.Provider>
                </Box>
            </Popover>
        </>
    )
}