import { Box } from "@mui/material"
import { AppContent } from "../../layouts/app-layout/AppLayout"
import Sections from "./components/Sections"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import userService from "./service/api/userService"
import { User } from "../../types/User"
import NotFound from "../not-found/NotFound"
import PageLoader from "../../components/ui/PageLoader"
import ProfileProvider from "./components/ProfileProvider"
import Info from "./components/Info"


export default function UserProfile() {
    const { userId } = useParams();

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
        <AppContent>
            <ProfileProvider user={user} setUser={setUser}>
                <Box>
                    <Info />
                    <Sections />
                </Box>
            </ProfileProvider>
        </AppContent>
    )
}