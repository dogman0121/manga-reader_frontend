import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import styles from "./AppLayout.module.css"
import { SvgIcon, Box, Button, Drawer, DrawerProps } from "@mui/material";
import { Avatar, Checkbox, Popover, PopoverProps} from "@mui/material";
import { getColorScheme} from "../../utils/colorScheme";
import { useState, useContext, useRef } from "react";
import UserContext from "../../context/UserContext";
import { EmptyUser } from "../../types/User";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import AuthModal from "../../features/Auth/components/AuthModal";
import ThemeContext from "../../context/ThemeContext";
import Header from "../../components/Header";
import Main from "../../components/Main";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { deleteRefreshToken, deleteAccessToken } from "../../utils/token";


function UserMenu(){
    const { setUser } = useContext(UserContext);

    const handleLogout = () => {
        deleteAccessToken()
        deleteRefreshToken()
        setUser(EmptyUser)
    }

    return (
        <Box>
            <Button
                sx={{
                    width: "100%",
                    borderRadius: "10px",
                    textTransform: "none",
                    height: "30px"
                }}
                color="error"
                variant="text"
                onClick={handleLogout}
            >
                Выйти
            </Button>
        </Box>
    )
}

function UserMenuPopover({open, onClose, anchorEl}: PopoverProps) {
    return (
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
                margin:"10px 0 0 0",
                ".MuiPaper-root": {
                    borderRadius: "12px",
                    width: "250px",
                    padding: "10px",
                }
            }}
        >   
            <UserMenu />
        </Popover>
    )
}

function UserMenuDrawer({open, onClose}: DrawerProps) {
    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor="right"
        >
            <Box
                sx={{
                    width: "70vw",
                    padding: "25px 15px"
                }}
            >
                <UserMenu />
            </Box>
        </Drawer>
    )
}


function AppHeader() {
    const theme = useTheme();

    const { setTheme } = useContext(ThemeContext);
    
    const { device } = useDeviceDetect();

    const { user } = useContext(UserContext);

    const [checked, setChecked] = useState(getColorScheme() === "dark" ? true : false);

    const [authModalOpened, setAuthModalOpened] = useState(false);

    const [userMenuOpened, setUserMenuOpened] = useState(false);

    const avatarRef = useRef(null);

    return (
        <Header>
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
                            <Link to="/catalog">
                                каталог
                            </Link>
                        </Box>
                        <Box component="li">
                            поиск
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row"
                    }}
                >
                    {user === EmptyUser && 
                        <>
                            <Checkbox
                                checked={checked}
                                onChange={
                                    (e: React.ChangeEvent<HTMLInputElement>) => { 
                                        setChecked(e.target.checked);
                                        e.target.checked ? setTheme("dark") : setTheme("light") 
                                    }
                                }
                            />
                            {device !== "pc" &&
                                <Avatar 
                                    onClick={() => {setAuthModalOpened(true)}}
                                    sx={{
                                        width: "36px",
                                        height: "36px"
                                    }}
                                />
                            }
                            {device === "pc" &&
                                <Button 
                                    variant="contained" 
                                    onClick={() => {setAuthModalOpened(true)}}
                                    sx={
                                        { 
                                            background: theme.palette.primary.main
                                        }
                                    }
                                >
                                    Войти
                                </Button>
                            }
                        </>
                    }
                    { user !== EmptyUser &&
                        <Avatar 
                            ref={avatarRef}
                            src={user.avatar}
                            sx={{
                                width: "36px",
                                height: "36px"
                            }}
                            onClick={() => {setUserMenuOpened(true)}}
                        />
                    }
                </Box>
            </Box>
            { device !== "mobile" ?
            <UserMenuPopover
                open={userMenuOpened}
                onClose={() => {setUserMenuOpened(false)}}
                anchorEl={avatarRef.current}
            />
            :
            <UserMenuDrawer 
                open={userMenuOpened}
                onClose={() => {setUserMenuOpened(false)}}
            />
            }
            <AuthModal open={authModalOpened && user === EmptyUser} onClose={() => {setAuthModalOpened(false)}}/>
        </Header>
    )
}

function AppFooter() {
    const {device} = useDeviceDetect();

    return (
        <Footer>
            <Box 
                sx={{
                    display: "flex",
                    flexDirection: device == "mobile" ? "column" : "row",
                    justifyContent: "space-between",
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
        </Footer>
    )
}

export default function AppLayout() {
    return (
        <>
            <AppHeader/>
            <Main>
                <Outlet />
            </Main>
            <AppFooter />
        </>
    )
};