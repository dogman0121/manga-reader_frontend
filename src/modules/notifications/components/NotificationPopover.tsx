import { Box, Paper, Popover, PopoverProps, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Notification from "../types/Notification";
import { notificationService } from "../services/api/notificationService";
import NotificationItem from "./NotificationItem";
import { generatePath, Link } from "react-router-dom";
import { AppRoutes } from "../../../routes";
import UserAuthContext from "../../../context/UserAuthContext";
import { User } from "../../../types/User";

export default function NotificationPopover({sx, ...props}: PopoverProps) {
    const theme = useTheme()

    const [notifications, setNotifications] = useState<Notification[]>([]);

    const {user, setUser} = useContext(UserAuthContext);

    useEffect(() => {
        notificationService.getNotifications()
            .then(({data}) => {
                setNotifications(prev => prev.concat(data))
            })
    }, []);

    useEffect(() => {
        if (!open || !user?.notifications_count)
            return
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
        <Popover
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
            sx={{
                ".MuiPaper-root": {
                    borderRadius: "12px",
                    minWidth: "375px"
                },
                ...sx
            }}
            {...props}
        >
            <Paper elevation={1}
                sx={{
                    padding: `${theme.spacing(2)} ${theme.spacing(3)}`
                }}
            >
                <Box
                    sx={{
                        // display:  "grid",
                        // gridTemplateColumns: "1fr 1fr 1fr",
                        // gap: theme.spacing(3)
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Typography>
                        Уведомления
                    </Typography>
                    {/* <Typography 
                        variant="caption" 
                        sx={{
                            textAlign: "end",
                            cursor: "pointer"
                        }}
                    >
                        прочитать все
                    </Typography> */}
                </Box>
                <Box
                    sx={{
                        mt: theme.spacing(2),
                        display: "flex",
                        flexDirection: "column",
                        gap: theme.spacing(2)
                    }}
                >
                    {notifications.map(notification => <NotificationItem key={notification.id} notification={notification} />)}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        mt: theme.spacing(3)
                    }}
                >
                    <Link to={generatePath(AppRoutes.NOTIFICATIONS)}>
                        <Typography 
                            variant="caption"
                            sx={{
                                width: "100%",
                                textAlign: "center",
                                "&:hover": {
                                    textDecoration: "underline"
                                }
                            }}
                        >
                            показать все
                        </Typography>
                    </Link>
                </Box>

            </Paper>
            
        </Popover>
    )
}