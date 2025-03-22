import { Box, GlobalStyles } from "@mui/material"
import { Outlet } from "react-router-dom"
import { DEVICE, useDeviceDetect } from "../../hooks/useDeviceDetect";


function FormLayout() {
    const device = useDeviceDetect();

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
                    p: device !== DEVICE.MOBILE ? "15px 20px 20px" : "5px 10px 10px",
                    bgcolor: "var(--paper-color)",
                    borderRadius: "16px",
                    mt: device !== DEVICE.MOBILE ? "28px" : undefined,

                    mx: "auto"
                }}
            >
                <Outlet />
            </Box>
        </>
    )
}

export default FormLayout;