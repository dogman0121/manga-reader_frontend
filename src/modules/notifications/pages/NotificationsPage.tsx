import { useContext, useEffect, useState } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import { Box, useTheme } from "@mui/material";
import { notificationService } from "../services/api/notificationService";
import UserAuthContext from "../../../context/UserAuthContext";
import { User } from "../../../types/User";
import Notification from "../types/Notification";
import NotificationContext from "../context/NotificationsContext";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import NotificationsProvider from "../components/NotificationsProvider";
import NotificationsList from "../components/NotificationsList";
import NotificationsCategorySelector from "../components/NotificationsCategorySelector";
import NotificationsContext from "../context/NotificationsContext";
import { AppHeaderMobileInner } from "../../../layouts/app-layout/AppLayoutMobile";


function NotificationPagePC() {
    const theme = useTheme();

    const {notifications} = useContext(NotificationContext);

    return (
        <AppContent>
            <PageHeader>Уведомления</PageHeader>
            <NotificationsCategorySelector 
                sx={{
                    mt: theme.spacing(2)
                }}
            />
            <NotificationsList 
                notifications={notifications}
                sx={{
                    mt: theme.spacing(3),
                }}
            />
        </AppContent>
    )
    
}

function NotificationPageMobile() {
    const {notifications} = useContext(NotificationsContext);

    const theme = useTheme()
    
    return (
        <>
            <AppHeaderMobileInner>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Box
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        Уведомления
                    </Box>
                    <NotificationsCategorySelector sx={{mt: theme.spacing(2)}}/>
                </Box>
                
            </AppHeaderMobileInner>
            <AppContent>
                <NotificationsList 
                    notifications={notifications}
                />
            </AppContent>
        </>
        
    )
}

export default function NotificationPage() {
    const {device} = useDeviceDetect();

    const [category, setCategory] = useState<"all" | "comments" | "titles" | "marks">("all");

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const {setUser} = useContext(UserAuthContext);

    useEffect(() => {
        notificationService.getNotifications(category)
            .then(({data}) => {
                setNotifications(data)
            })
    }, [category]);

    useEffect(() => {
        notificationService.readNotifications()
            .then(({error}) => {
                if (!error)
                    setUser((user: User) => {
                        const newUser = Object.assign({}, user);
                        newUser.notifications_count = 0
                        return newUser
                    })
            })
    }, [])
    
    return (
        <NotificationsProvider
            notifications={notifications}
            category={category}
            setCategory={setCategory}
        >
            {device == DEVICE.PC && <NotificationPagePC />}
            {device == DEVICE.PAD && <NotificationPagePC />}
            {device == DEVICE.MOBILE && <NotificationPageMobile />}
        </NotificationsProvider>
    )
}