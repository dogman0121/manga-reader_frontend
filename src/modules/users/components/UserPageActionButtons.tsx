import { Box, Button, ButtonProps } from "@mui/material"
import { useContext, useState } from "react"
import UserAuthContext from "../../../context/UserAuthContext"
import UserProfileContext from "../context/UserProfileContext";
import userService from "../service/api/userService";
import { Link } from "react-router-dom";
import { generatePath } from "../../../routes";
import { UsersRoutes } from "../UsersRouter";
import AppButton from "../../../components/ui/AppButton";

export function SubscribeButton({sx, ...props}: ButtonProps) {
    const {user: profileUser} = useContext(UserProfileContext);

    const [subscribed, setSubscribed] = useState<boolean>(profileUser?.subscribed || false);

    const handleSubscribe = async () => {
        if (!profileUser) return;

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
        <>
            {subscribed ?
                <AppButton
                    variant="contained"
                    color="secondary"
                    onClick={handleSubscribe}
                    sx={{
                        pt: "3px",
                        ...sx
                    }}
                >
                    Отписаться
                </AppButton>
                :
                <AppButton
                    variant="contained"
                    color="primary"
                    onClick={handleSubscribe}
                    sx={{
                        pt: "3px",
                        ...sx
                    }}
                    {...props}
                >
                    Подписаться
                </AppButton>
            }
        </>
    )
}

export function EditProfileButton({sx, ...props}: ButtonProps) {
    return (
        <Link to="/users/edit">
            <AppButton
                variant="contained"
                color="secondary"
                sx={{
                    ...sx
                }}
                {...props}
            >
                Редактировать
            </AppButton>
        </Link>
    )
}

export default function UserPageActionButtons() {
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
                    <Link to={generatePath(UsersRoutes.SETTINGS)}>
                        <Button variant="outlined">Редактировать</Button>
                    </Link>
                </>
            }
            
        </Box>
    )
}