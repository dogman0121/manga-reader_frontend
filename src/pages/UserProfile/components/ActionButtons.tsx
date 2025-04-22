import { Box, Button } from "@mui/material"
import { useContext, useState } from "react"
import UserAuthContext from "../../../context/UserAuthContext"
import UserProfileContext from "../context/UserProfileContext";
import userService from "../service/api/userService";
import { Link } from "react-router-dom";
import { generatePath, UserRoutes } from "../../../routes";

export default function ActionButtons() {
    const {user: authUser} = useContext(UserAuthContext);
    const {user: profileUser} = useContext(UserProfileContext);

    const [subscribed, setSubscribed] = useState<boolean>(profileUser?.subscribed || false);

    if (profileUser == null)
        return;

    const handleSubscribe = async () => {
        if (subscribed){
            const { error } = await userService.unsubscribeUser(profileUser.id)
            if (!error)
                setSubscribed(false);
        }
        else {
            const {error} = await userService.subscribeUser(profileUser?.id);
            if (!error)
                setSubscribed(true);
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",

                rowGap: "5px"
            }}
        >
            {authUser?.id != profileUser.id ?
                <>
                    {subscribed ? 
                        <Button onClick={handleSubscribe} variant="outlined">Отписаться</Button>
                        :
                        <Button onClick={handleSubscribe} variant="contained">Подписаться</Button>
                    }
                </>
                :
                <>
                    <Link to={generatePath(UserRoutes.SETTINGS, {userId: profileUser.id})}>
                        <Button variant="outlined">Редактировать</Button>
                    </Link>
                </>
            }
            
        </Box>
    )
}