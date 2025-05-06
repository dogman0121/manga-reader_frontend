import { Box } from "@mui/material";

export default function FormField({children}: {children: React.ReactNode}) {
    return (
        <Box
            sx={{
                border: "1px solid #dadada",
                p: "10px",
                borderRadius: "12px",
                mt: "8px"
            }}
        >
            {children}
        </Box>
    )
}