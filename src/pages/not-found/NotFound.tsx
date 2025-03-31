import { Box, Typography } from "@mui/material";

function NotFound() {
    return (
        <Box
            sx={{
                width: "100%",
                height: "85vh",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                columnGap: "15px"
            }}
        >
            <Typography variant="h1">404</Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Typography fontSize={"24px"}>Упс... Что-то не так!</Typography>
                <Typography fontSize={"20px"}>Страница не найдена</Typography>
            </Box>
        </Box>
    )
}

export default NotFound;