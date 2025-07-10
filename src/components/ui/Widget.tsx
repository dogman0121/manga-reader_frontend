import { Paper, PaperProps } from "@mui/material"

export default function Widget({ onClick, sx, children }: PaperProps) {
    return (
        <Paper
            onClick={onClick}
            elevation={1}
            sx={{
                padding: "8px",
                borderRadius: "8px",
                display: "flex",
                boxShadow: "none",
                ...sx,
            }}
        >
            { children }
        </Paper>
    )   
}