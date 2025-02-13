import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import { darkTheme } from "../../theme";
import styles from "./AppLayout.module.css"
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

function Header() {
    const theme = useTheme();

    return (
        <Box 
            sx = {{
                background: theme.palette.customBackgrounds?.header
            }}
            component="header"
        >
            <Box
                sx = {{
                    display: "flex",
                    justifyContent: "space-between"
                }}
                className={styles.Content}
            >
                <Box>
                    Лево
                </Box>
                <Box>
                    Право
                </Box>
            </Box>
        </Box>
    )
}

function Footer() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                background: theme.palette.customBackgrounds?.footer
            }}
            component="footer"
        >
            <Box
                className={styles.Content}
            >
                footer
            </Box>
        </Box>
    )
}

export default function AppLayout() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Header />
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