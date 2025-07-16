import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import PageLoader from "../../../components/ui/PageLoader";
import NotFound from "../../../pages/not-found/NotFound";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import ProfileProvider from "../components/ProfileProvider";
import userService from "../service/api/userService";
import { User } from "../types/User";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import { AppHeaderMobile } from "../../../layouts/app-layout/AppLayoutMobile";
import { AppTab, AppTabContext, AppTabList } from "../../../components/ui/AppTabs";
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import UserAuthContext from "../../../context/UserAuthContext";
import UserProfileContext from "../context/UserProfileContext";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { EditProfileButton, SubscribeButton } from "../components/UserPageActionButtons";
import UserPageStats from "../components/UserPageStats";


function UserPagePC() {
    const [section, setSection] = useState("1");

    const {user: currentUser} = useContext(UserAuthContext);

    const {user: profile} = useContext(UserProfileContext);

    const handleSetSection = (_event: React.SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };

    if (!profile) return null;

    return (
        <>
            <AppContent>
                <Box
                    sx={{
                        maxWidth: "1060px",
                        p: "15px 30px",
                        mx: "auto",
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "15px"
                    }}
                >
                    <Box
                        sx={{
                            
        
                            display: "flex",
                            flexDirection: "row",
                            columnGap: "40px"
                        }}
                    >
                        <Avatar
                            src={profile?.avatar || ""}
                            sx={{width: "120px", height: "120px"}}
                        />
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <Box>
                                <Typography fontSize={"18px"}>{profile?.login}</Typography>
                                <UserPageStats />
                            </Box>
                            {profile.id == currentUser?.id ? 
                                <EditProfileButton />
                                :
                                <SubscribeButton />
                            }
                        </Box>
                    </Box>
                    <Box>{profile?.about}</Box>
                </Box>
                <AppTabContext value={section}>
                    <AppTabList onChange={handleSetSection}>
                        <AppTab value="1" label="Списки"/>
                    </AppTabList>
                </AppTabContext>
            </AppContent>
        </>
    )
}

function UserPageMobile() {
    const theme = useTheme();

    const {user: currentUser} = useContext(UserAuthContext);

    const {user: profile} = useContext(UserProfileContext);

    const [section, setSection] = useState("1");

    const handleSetSection = (_event: React.SyntheticEvent, newValue: string) => {
        setSection(newValue);
    };

    if (!profile) return null;

    return (
        <>
            <AppHeaderMobile 
                backArrow
                firstLine={
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        {currentUser?.id == profile.id ?
                            <>
                                <Typography fontSize={"inherit"}>Мой профиль</Typography>
                                <Link to="/users/settings" style={{display: "flex"}}>
                                    <SettingsRoundedIcon />
                                </Link>
                            </>
                            :
                            <>
                                <Typography fontSize={"inherit"}>{profile.login}</Typography>
                                <MoreVertIcon />
                            </>
                        }
                    </Box>
                }
            />
            <AppContent>
                <Box
                    sx={{
                        mx: "auto",

                        display: "flex",
                        flexDirection: "column",
                        rowGap: "10px"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            columnGap: "15px"
                        }}
                    >
                        <Avatar
                            src={profile?.avatar || ""}
                            sx={{width: "90px", height: "90px"}}
                        />
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <Box>
                                <Typography fontSize={"18px"}>{profile?.login}</Typography>
                                <UserPageStats />
                            </Box>
                        </Box>
                    </Box>
                    {profile?.about && (
                        <Box>{profile.about}</Box>
                    )}
                </Box>
                {profile.id != currentUser?.id && (
                    <SubscribeButton
                        sx={{
                            mt: theme.spacing(3),
                            width: "100%"
                        }}
                    />
                )}
                <AppTabContext value={section} >
                    <AppTabList onChange={handleSetSection} sx={{mt: theme.spacing(3)}}>
                        <AppTab value="1" label="Списки"/>
                    </AppTabList>
                </AppTabContext>
            </AppContent>
        </>
    )
}

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
            <ProfileProvider user={user} setUser={setUser}>
                {device == DEVICE.MOBILE && <UserPageMobile />}
                {device == DEVICE.PC && <UserPagePC />}
                {device == DEVICE.PAD && <UserPagePC />}
            </ProfileProvider>
        </>
        
    )
}