import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { darkTheme, lightTheme } from "../../theme";
import SvgIcon from "@mui/material/SvgIcon";
import styles from "./AppLayout.module.css"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Avatar, Checkbox } from "@mui/material";
import { getColorScheme, setColorScheme } from "../../utils/colorScheme";
import { useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { EmptyUser } from "../../types/User";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import AuthModal from "../../features/AuthModal/components/AuthModal";


function Header({ setTheme }: {setTheme: Function}) {
    const theme = useTheme();
    
    const { device } = useDeviceDetect();

    const { user } = useContext(UserContext);

    const [checked, setChecked] = useState(getColorScheme() === "dark" ? true : false);

    const [authModalOpen, setAuthModalOpen] = useState(false);

    return (
        <Box 
            sx = {{
                background: theme.palette.customBackgrounds?.header,
                boxShadow: "0 1px 0 rgba(0, 0, 0, 0.1)"
            }}
            component="header"
        >
            <Box
                sx = {{
                    display: "flex",
                    justifyContent: "space-between",
                    py: "10px"
                }}
                className={styles.Content}
            >
                <Box
                    sx={{
                        display: "flex"
                    }}
                >
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
                    
                    <Box component="ul"
                        sx={{
                            margin: "auto 0 auto 40px",
                            display: "flex",
                            flexDirection: "row",
                            columnGap: "25px"
                        }}
                    >
                        <Box component="li">
                            каталог
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
                                    onClick={() => {setAuthModalOpen(true)}}
                                    sx={{
                                        width: "36px",
                                        height: "36px"
                                    }}
                                />
                            }
                            {device === "pc" &&
                                <Button 
                                    variant="contained" 
                                    onClick={() => {setAuthModalOpen(true)}}
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
                            src={user.avatar}
                            sx={{
                                width: "36px",
                                height: "36px"
                            }}
                        />
                    }
                </Box>
            </Box>
            <AuthModal open={authModalOpen} onClose={() => {setAuthModalOpen(false)}}/>
        </Box>
    )
}

function Footer() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                background: theme.palette.customBackgrounds?.footer,
                marginTop: "20px",
                py: "20px"
            }}
            component="footer"
        >
            <Box
                className={styles.Content}
            >
                <Box 
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
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
            </Box>
        </Box>
    )
}

export default function AppLayout() {
    const [isDarkMode, setIsDarkMode] = useState(getColorScheme() === "dark");

    const handleTheme = (theme: string) => {
        setIsDarkMode(!isDarkMode);
        setColorScheme(theme);
    }

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Header 
                setTheme={handleTheme}
            />
            <main>
                <Box 
                    className={styles.Content}
                >
                    <Outlet />
                </Box>
            </main>
            <Footer />
        </ThemeProvider>
    )
};