import { useContext, useEffect, useState } from "react";
import AppToggleButton from "../../../components/ui/AppToggleButton";
import AppToggleGroup from "../../../components/ui/AppToggleButtonGroup";
import PageHeader from "../../../components/ui/PageHeader";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import { Box, useTheme } from "@mui/material";
import { notificationService } from "../services/api/notificationService";
import UserAuthContext from "../../../context/UserAuthContext";
import NotificationItem from "../components/NotificationItem";
import { User } from "../../../types/User";
import Notification from "../types/Notification";

export default function NotificationPage() {
    const theme = useTheme();

    const [ category, setCategory ] = useState("all");

    const handleChoose = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
        if (newValue !== null)
            setCategory(newValue);
    }

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
        <AppContent>
            <PageHeader>Уведомления</PageHeader>
            <AppToggleGroup
                value={category}
                onChange={handleChoose}
                exclusive
                sx={{
                    mt: theme.spacing(2)
                }}
            >
                <AppToggleButton value="all">все</AppToggleButton>
                <AppToggleButton value="comments">комментарии</AppToggleButton>
                <AppToggleButton value="marks">оценки</AppToggleButton>
                <AppToggleButton value="manga">тайтлы</AppToggleButton>
            </AppToggleGroup>
            <Box
                sx={{
                    mt: theme.spacing(3),
                    display: "flex",
                    flexDirection: "column",
                    gap: theme.spacing(2)
                }}
            >
                {notifications.map(notification => <NotificationItem key={notification.id} notification={notification} />)}
            </Box>
        </AppContent>
    )
}