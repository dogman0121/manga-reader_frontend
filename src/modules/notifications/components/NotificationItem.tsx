import { Avatar, Box, Typography, useTheme } from "@mui/material";
import Notification from "../types/Notification";
import { generatePath, Link } from "react-router-dom";
import formatTimedelta from "../../../utils/formatTimedelta";

export default function NotificationItem({notification}: {notification: Notification}) {
    return (
        <>
            {notification.action == "subscribe" && (
                <NotificationBody 
                    image={notification.payload.user?.avatar || ""}
                    creatorLink={generatePath("/users/:userId", {userId: notification.payload.user?.id.toString() || ""})}
                    creator={notification.payload.user?.login || ""}
                    text={<>подписался на вас</>}
                    datetime={new Date(notification.created_at)}
                />
            )}
        </>
    )
}

function NotificationBody({
    image,
    creatorLink,
    creator,
    text,
    datetime
}: {
    image: string,
    creatorLink: string,
    creator: string,
    text: React.ReactElement,
    datetime: Date
}) {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: theme.spacing(3),
                alignItems: "center"
            }}
        >
            <Avatar 
                src={image}
            />
            <Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: theme.spacing(2)
                    }}
                >
                    <Link to={creatorLink}>
                        <Typography
                            fontWeight={600}

                        >
                            {creator}
                        </Typography>
                    </Link>
                    <Typography variant="caption">
                        {formatTimedelta(new Date().getTime() - datetime.getTime())} назад
                    </Typography>
                </Box>
                
                <Box>
                    {text}
                </Box>
            </Box>
        </Box>
    )
}