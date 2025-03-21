import { Box, GlobalStyles } from "@mui/material"
import { Outlet } from "react-router-dom"


function FormLayout() {
    return (
        <>
            <GlobalStyles styles={{
                "html:root": {
                    "--mui-palette-background-default": "#E9E9E9"
                },
                "html:root[data-color-scheme='dark']": {
                    "--mui-palette-background-default": "#121212"
                }
            }} />
            <Box
                sx={{
                    maxWidth: "960px",
                    m: "0 auto",
                    p: "15px 20px 20px",
                    bgcolor: "var(--paper-color)",
                    borderRadius: "16px",
                    mt: "28px"
                }}
            >
                <Outlet />
            </Box>
        </>
    )
}

export default FormLayout;