import { BoxProps, Paper } from "@mui/material"
import { useTheme } from "@mui/material";

export default function Widget({ onClick, sx, children }: BoxProps) {
    const theme = useTheme();

    return (
        <Paper
            onClick={onClick}
            sx={{
                ...sx,
                padding: "10px",
                borderRadius: "12px",
                bgcolor: theme.palette.customBackgrounds?.widget1,
                display: "flex",
            }}
        >
            { children }
        </Paper>
    )   
}