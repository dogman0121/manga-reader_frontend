import Box, { BoxProps } from "@mui/material/Box"
import styles from "../App.module.css"


export default function Main({ sx, children }: BoxProps) {
    return (
        <Box
            sx={sx}
            component="main"
        >
            <Box
                className={styles.Content}
            >
                {children}
            </Box>
        </Box>
    )
}