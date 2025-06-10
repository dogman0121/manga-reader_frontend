import { Box, useTheme } from "@mui/material";

export default function FormField({children}: {children: React.ReactNode}) {
    const theme = useTheme()
    
    return (
        <Box
            sx={{
                border: "1px solid #dadada",
                p: "10px",
                borderRadius: "12px",
                mt: theme.spacing(1),
                bgcolor: theme.palette.background.paper
            }}
        >
            {children}
        </Box>
    )
}