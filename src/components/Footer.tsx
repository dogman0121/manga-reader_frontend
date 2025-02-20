import Box, { BoxProps } from "@mui/material/Box"
import styles from "../App.module.css"
import { useTheme } from "@mui/material/styles";


export default function Footer({ children }: BoxProps) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                background: theme.palette.customBackgrounds?.footer,
                marginTop: "20px",
            }}
            component="footer"
        >
            <Box
                sx={{
                    py: "20px"
                }}
                className={styles.Content}
            >
                {children}
            </Box>
        </Box>
    )
}