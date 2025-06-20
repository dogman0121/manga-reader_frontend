import { Box, CircularProgress, Typography } from "@mui/material";
import React, { Children, useState } from "react";
import useMainBlur from "../../../layouts/app-layout/hooks/useMainBlur";
import FormContext from "../context/FormContext";
import Notification from "../../../components/ui/Notification";
import ErrorIcon from '@mui/icons-material/Error';

function BlurError({title, subTitle}: {title: string, subTitle: string}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "10px",
                alignItems: "center"
            }}
        >
            <ErrorIcon 
                sx={{
                    width: "35px",
                    height: "35px",
                    color: "#FF0000"
                }}
            />
            <Box
            >
                <Typography fontSize={18}>{title}</Typography>
                <Typography fontSize={14}>{subTitle}</Typography>
            </Box>
        </Box>
    )
}

export default function FormProvider({children}: {children?: React.ReactNode}) {
    const {setOpened, setContent} = useMainBlur();

    const setLoading = (opened: boolean) => {
        setContent(<CircularProgress />)
        setOpened(opened);
    }

    const showErrorBlur = (title: string, subTitle: string) => {
        setContent(<BlurError title={title} subTitle={subTitle}/>)
        setOpened("true");
    }   

    const [notificationType, setNotificationType] = useState<"success" | "error">("success");
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationOpened, setNotificationOpened] = useState(false);

    const showNotification = (notificationType: "success" | "error", notificationMessage: string) => {
        setNotificationType(notificationType);
        setNotificationMessage(notificationMessage);
        setNotificationOpened(true);
    }

    return (
        <>
            <FormContext.Provider value={{
                setLoading: setLoading, 
                showNotification: showNotification,
                showErrorBlur: showErrorBlur
            }}>
                {Children.map(children, child => child)}
            </FormContext.Provider>
            <Notification
                open={notificationOpened}
                onClose={() => {setNotificationOpened(false)}}
                variant={notificationType}
                message={notificationMessage}
            />
        </>
    )
}