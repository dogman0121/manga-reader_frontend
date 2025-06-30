import { Box, SxProps, useTheme } from "@mui/material";
import Notification from "../types/Notification";
import NotificationItem from "./NotificationItem";

export default function NotificationsList({notifications, sx}: {notifications: Notification[], sx?: SxProps}) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: theme.spacing(2),
                ...sx
            }}
        >
            {notifications.map(notification => <NotificationItem key={notification.id} notification={notification} />)}
        </Box>
    )
    
}