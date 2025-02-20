import Box, { BoxProps } from "@mui/material/Box"
import styles from "../App.module.css"
import { useTheme } from "@mui/material/styles";


export default function Header({ children }: BoxProps) {
    const theme = useTheme();

    return (
        <Box
            sx = {{
                background: theme.palette.customBackgrounds?.header,
                boxShadow: "0 1px 0 rgba(0, 0, 0, 0.1)"
            }}
            component="header"
        >
            <Box
                sx={{
                    py: "10px"
                }}
                className={styles.Content}
            >
                {children}
            </Box>
        </Box>
    )
}