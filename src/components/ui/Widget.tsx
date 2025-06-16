import { Paper, PaperProps } from "@mui/material"
import { useTheme } from "@mui/material";

export default function Widget({ onClick, sx, children }: PaperProps) {
    const theme = useTheme();

    return (
        <Paper
            onClick={onClick}
            elevation={1}
            sx={{
                padding: "8px",
                borderRadius: "8px",
                bgcolor: theme.palette.customBackgrounds.widget1,
                display: "flex",
                boxShadow: "none",
                ...sx,
            }}
        >
            { children }
        </Paper>
    )   
}