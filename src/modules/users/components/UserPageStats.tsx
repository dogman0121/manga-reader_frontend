import { useContext, useEffect, useState } from "react";
import UserProfileContext from "../context/UserProfileContext";
import { User } from "../types/User";
import userService from "../service/api/userService";
import { Box, Typography } from "@mui/material";
import AppModal from "../../../components/AppModal";
import { UserItem } from "../../../components/UserList";

export default function UserPageStats() {
    const { user: profileUser } = useContext(UserProfileContext);

    if (!profileUser)
        return null;

    const [subscribers, setSubscribers] = useState<Array<User>>([]);
    const [subscribersOpened, setSubscribersOpened] = useState(false);

    useEffect(() => {
        userService.getSubscribers(profileUser.id, 1)
            .then(({data}) => {
                setSubscribers((prev) => [...prev, ...data])
            })
    }, [])


    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "20px"
                }}
            >
                <Box>
                    <Typography fontSize="13px" textTransform="lowercase" variant="subtitle1">Посты</Typography>
                    <Typography>0</Typography>
                </Box>
                <Box
                    onClick={()=>{setSubscribersOpened(true)}} sx={{cursor: "pointer"}}
                >
                    <Typography fontSize="13px" textTransform="lowercase" variant="subtitle1">Подписчики</Typography>
                    <Typography>{profileUser.subscribers_count}</Typography>
                </Box>
                <Box>
                    <Typography fontSize="13px" textTransform="lowercase" variant="subtitle1">Подписки</Typography>
                    <Typography>0</Typography>
                </Box>
            </Box>
            <AppModal
                title="Подписчики"
                open={subscribersOpened}
                onClose={() => {setSubscribersOpened(false)}}
            >
                <Box
                    sx={{
                        width: "350px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        alignItems:"start"
                    }}
                >
                    {subscribers.map(user => <UserItem user={user}/>)}
                </Box>
            </AppModal> 
        </>
    )
}