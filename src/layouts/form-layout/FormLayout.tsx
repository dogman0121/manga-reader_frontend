import { Box, CircularProgress, GlobalStyles } from "@mui/material"
import { Outlet } from "react-router-dom"
import { DEVICE, useDeviceDetect } from "../../hooks/useDeviceDetect";
import { useState } from "react";
import FormStateContext from "./FormStateContext";
import FormModal from "./FormModal";
import { AppContent } from "../app-layout/AppLayout";


function FormLayout() {
    const { device } = useDeviceDetect();

    const [isLoading, setIsLoading] = useState(false);
    const [messageOpened, setMessageOpened] = useState(false);
    const [message, setMessage] = useState(<></>)

    const mobileStyles = {
        p: "5px 10px 10px",
        mx: "auto",
        maxWidth: "960px",
        bgcolor: "var(--paper-color)",
        borderRadius: "16px",
    };

    const pcStyles = {
        p: "15px 20px 20px",
        mx: "auto",
        maxWidth: "960px",
        bgcolor: "var(--paper-color)",
        borderRadius: "16px",
    }

    return (
        <AppContent>
            <GlobalStyles styles={{
                "html:root": {
                    "--mui-palette-background-default": "#E9E9E9"
                },
                "html:root[data-color-scheme='dark']": {
                    "--mui-palette-background-default": "#121212"
                }
            }} />
            <Box
                sx={device !== DEVICE.MOBILE ? pcStyles : mobileStyles}
            >
                <FormStateContext.Provider
                    value={{
                        setIsLoading,
                        messageOpened,
                        setMessageOpened,
                        setMessage
                    }}
                >
                    <Outlet />
                </FormStateContext.Provider>
            </Box>
            <FormModal
                open={isLoading || messageOpened}
            >
                <>
                    {isLoading && (
                        <CircularProgress />
                    )}
                    {messageOpened && (
                        {message}
                    )}
                </>
            </FormModal>
        </AppContent>
    )
}

export default FormLayout;