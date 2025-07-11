import { Box } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PageLoader from "../../../components/ui/PageLoader";
import NotFound from "../../../pages/not-found/NotFound";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import ProfileProvider from "../components/ProfileProvider";
import UserPageInfo from "../components/UserPageInfo";
import UserPageActionButtons from "../components/UserPageActionButtons";
import userService from "../service/api/userService";
import { User } from "../types/User";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import { AppHeaderMobile } from "../../../layouts/app-layout/AppLayoutMobile";


export default function UserPage() {
    const { userId } = useParams();

    const {device} = useDeviceDetect();

    const [user, setUser] = useState<User | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        userService.fetchUser(parseInt(userId || "", 10))
            .then(({data}) => {
                setUser(data as User);
                setIsLoading(false);
            })
    }, [userId])

    if (isLoading)
        return <PageLoader />

    if (user == null)
        return <NotFound />

    return (
        <>
            {device == DEVICE.MOBILE && (
                <AppHeaderMobile 
                    backArrow
                    firstLine={"Профиль пользователя"}
                />
            )}
            <AppContent>
                <ProfileProvider user={user} setUser={setUser}>
                    <Box>
                        <UserPageInfo />
                        <UserPageActionButtons />
                    </Box>
                </ProfileProvider>
            </AppContent>
        </>
        
    )
}