import {Box, CircularProgress} from "@mui/material"

export default function PageLoader() {
    return (
        <Box
            sx={{
                width: "100%",
                height: "85vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <CircularProgress />
        </Box>
    )
}