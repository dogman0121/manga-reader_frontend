import { Box, PaperProps, useTheme } from "@mui/material"

export default function Widget({ onClick, sx, children }: PaperProps) {
    const theme = useTheme();

    return (
        <Box
            onClick={onClick}
            sx={{
                padding: "8px",
                borderRadius: "8px",
                display: "flex",
                boxShadow: "none",
                bgcolor: theme.palette.customBackgrounds.widget1,
                ...sx,
            }}
        >
            { children }
        </Box>
    )   
}