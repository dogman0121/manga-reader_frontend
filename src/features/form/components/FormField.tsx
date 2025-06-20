import { Box, SxProps, useTheme } from "@mui/material";
import { getColorScheme } from "../../../utils/colorScheme";

export default function FormField({children, sx}: {children: React.ReactNode, sx?: SxProps}) {
    const theme = useTheme()

    const color = getColorScheme() == "light" ? "0, 0, 0" : "255, 255, 255"
    
    return (
        <Box
            sx={{
                border: `1px solid rgba(${color}, 0.23)`,
                p: "10px",
                borderRadius: "12px",
                mt: theme.spacing(1),
                bgcolor: theme.palette.background.paper,
                ...sx
            }}
        >
            {children}
        </Box>
    )
}