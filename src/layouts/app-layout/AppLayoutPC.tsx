import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css"
import { SvgIcon, Box, IconButton, Badge, Tooltip } from "@mui/material";
import { Avatar, Checkbox } from "@mui/material";
import { getColorScheme} from "../../utils/colorScheme";
import { useState, useContext, useRef } from "react";
import { DEVICE, useDeviceDetect } from "../../hooks/useDeviceDetect";
import ThemeContext from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import SearchModal from "../../features/search/components/SearchModal";
import { AuthContext } from "../../features/auth/context/AuthContext";
import Blur from "../../components/Blur";
import { useTheme } from "@mui/material/styles";
import MainBlurContext from "./MainBlurContext";
import { AppRoutes } from "../../routes";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from "../../components/ui/Button";
import UserAuthContext from "../../context/UserAuthContext";
import NotificationPopover from "../../modules/notifications/components/NotificationPopover";
import { UserMenuPopover } from "../../modules/users/components/UserMenu";


export function ContentPC({children}: {children: React.ReactNode}) {
    return (
        <Box
            sx={{
                p: "35px 20px 25px",
                maxWidth: "1240px",

                margin: "0 auto",
            }}
        >
            {children}
        </Box>
    )
}

export function Content({children}: {children: React.ReactNode}) {
    return (
        <Box
            sx={{
                px: "20px",
                maxWidth: "1240px",

                margin: "0 auto",
            }}
        >
            {children}
        </Box>
    )
}


function AppHeader() {
    const { setTheme } = useContext(ThemeContext);

    const { user } = useContext(UserAuthContext);

    const { openModal } = useContext(AuthContext);

    const [notificationsOpened, setNotificationsOpened] = useState(false);

    const [checked, setChecked] = useState(getColorScheme() === "dark" ? true : false);

    const [userMenuOpened, setUserMenuOpened] = useState(false);

    const [searchModalOpened, setSearchModalOpened] = useState(false);

    const notificationRef = useRef(null);

    const avatarRef = useRef(null);

    const theme = useTheme();

    return (
        <Box
            sx={{
                background: theme.palette.customBackgrounds?.header,
                boxShadow: "0 1px 0 rgba(0, 0, 0, 0.1)",
                py: "7px"
            }}
            component="header"
        >
            <Content>
                <Box
                    sx = {{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex"
                        }}
                    >   
                        <Link to="/">
                            <SvgIcon 
                                viewBox="0 0 96 96"
                                sx={{
                                    width: "32px",
                                    height: "32px"
                                }}
                            >
                                <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
                                    fill="var(--icon)" stroke="none">
                                    <path d="M135 888 c-3 -7 -4 -195 -3 -418 l3 -405 85 0 85 0 3 131 3 130 43
                                    43 44 43 127 -176 127 -176 84 0 c69 0 84 3 84 16 0 8 -72 115 -160 236 l-161
                                    221 29 31 c133 143 282 318 277 326 -3 6 -46 10 -94 10 l-87 0 -155 -171 -154
                                    -171 -5 169 -5 168 -83 3 c-60 2 -84 -1 -87 -10z"/>
                                </g>
                            </SvgIcon>
                        </Link>
                        
                        <Box component="ul"
                            sx={{
                                margin: "auto 0 auto 40px",
                                display: "flex",
                                flexDirection: "row",
                                columnGap: "25px"
                            }}
                        >
                            
                            <Box component="li">
                                <Link to={AppRoutes.CATALOG}>
                                    каталог
                                </Link>
                            </Box>
                            <Box 
                                component="li" 
                                onClick={() => {setSearchModalOpened(true)}}
                            >
                                поиск
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            columnGap: theme.spacing(3)
                        }}
                    >
                        {user == null && 
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    columnGap: "4px"
                                }}
                            >
                                <Checkbox
                                    checked={checked}
                                    onChange={
                                        (e: React.ChangeEvent<HTMLInputElement>) => { 
                                            setChecked(e.target.checked);
                                            e.target.checked ? setTheme("dark") : setTheme("light") 
                                        }
                                    }
                                    sx={{
                                        height: "36px",
                                        widows: "36px"
                                    }}
                                />
                                <Button
                                    variant="contained" 
                                    onClick={() => {openModal()}}
                                    sx={{
                                        height: "32px"
                                    }}
                                >
                                    Войти
                                </Button>
                            </Box>
                        }
                        { user && 
                            <>
                                <Tooltip
                                    title="Уведомления"
                                >
                                    <IconButton
                                        onClick={() => setNotificationsOpened(true)}
                                        ref={notificationRef}
                                    >
                                        <Badge 
                                            badgeContent={user.notifications_count} 
                                            color="error"
                                            sx={{
                                                "&:hover .MuiBadge-badge": {
                                                    opacity: 0,
                                                    transition: "0.2s ease-in"
                                                }
                                            }}
                                        >
                                            <NotificationsIcon 
                                                sx={{
                                                    width: "22px",
                                                    height: "22px"
                                                }}
                                            />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                                <Avatar 
                                    ref={avatarRef}
                                    src={user.avatar || ""}
                                    sx={{
                                        width: "40px",
                                        height: "40px",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => setUserMenuOpened(true)}
                                />
                                <NotificationPopover 
                                    open={notificationsOpened}
                                    onClose={() => {setNotificationsOpened(false)}}
                                    anchorEl={notificationRef.current}
                                />
                                <UserMenuPopover
                                    open={userMenuOpened}
                                    onClose={() => {setUserMenuOpened(false)}}
                                    anchorEl={avatarRef.current}
                                />
                            </>
                        }
                    </Box>
                </Box>
                <SearchModal open={searchModalOpened} onClose={() => {setSearchModalOpened(false)}}/>
            </Content>
        </Box>
    )
}

function AppFooter() {
    const { device } = useDeviceDetect();

    const theme = useTheme();

    return (
        <Box
            sx={{
                background: theme.palette.customBackgrounds?.footer,
                py: "20px",
            }}
            component="footer"
        >
            <Content>
                <Box 
                    sx={{
                        display: "flex",
                        flexDirection: device === DEVICE.MOBILE ? "column" : "row",
                        justifyContent: "space-between",
                        py: "20px",
                        rowGap: "30px"
                    }}
                >
                    <Box className={styles.Footer_Section}>
                        <Box className={styles.Footer_Subsection}>
                            <Box className={styles.Footer_h1}>KANWOO</Box>
                            <Box className={styles.Footer_Item}>Обратная связь</Box>
                        </Box>
                        <Box className={styles.Footer_Subsection}>
                            <Box className={styles.Footer_h2}>Почта для связи</Box>
                            <Box className={styles.Footer_Item}>contact@kanwoo.ru</Box>
                        </Box>
                    </Box>
                    <Box className={styles.Footer_Section}>
                        <Box className={styles.Footer_h2}>Полезные статьи</Box>
                        <Box className={styles.Footer_Content}>
                            <Box className={styles.Footer_Item}>Как создать мангу</Box>
                            <Box className={styles.Footer_Item}>Как создать команду</Box>
                            <Box className={styles.Footer_Item}>Как добавить главу</Box>
                        </Box>
                    </Box>
                    <Box className={styles.Footer_Section}>
                        <Box className={styles.Footer_h2}>Инфо</Box>
                        <Box className={styles.Footer_Content}>
                            <Box className={styles.Footer_Item}>Пользовательское соглашение</Box>
                            <Box className={styles.Footer_Item}>Для правообладателей</Box>
                        </Box>
                    </Box>
                </Box>
            </Content>
        </Box>
    )
}

function AppMain({children}: {children: React.ReactNode}) {
    return (
        <Box
            sx={{
                position: "relative"
            }}
            component="main"
        >
            {children}
        </Box>
    )
}


function AppLayoutPC() {
    const [blurOpened, setBlurOpened] = useState<boolean>(false);

    const [blurContent, setBlurContent] = useState<React.ReactNode>(<></>);

    return (
        <>
            <AppHeader/>
            <AppMain>
                <MainBlurContext.Provider
                    value={{
                        opened: blurOpened,
                        content: blurContent,
                        setOpened: setBlurOpened,
                        setContent: setBlurContent
                    }}
                >
                    <Outlet />
                </MainBlurContext.Provider>
                <Blur open={blurOpened}>
                    {blurContent}
                </Blur>
            </AppMain>
            <AppFooter />
        </>
    )
};

export default AppLayoutPC;