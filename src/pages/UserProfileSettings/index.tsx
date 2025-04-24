import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState, useEffect } from "react";
import { AppContent } from '../../layouts/app-layout/AppLayout';
import Info from './components/Info';
import Security from './components/Security';
import { User } from '../../types/User';
import userService from '../UserProfile/service/api/userService';
import { useParams } from 'react-router-dom';
import PageLoader from '../../components/ui/PageLoader';
import NotFound from '../not-found/NotFound';
import ProfileProvider from '../UserProfile/components/ProfileProvider';


export default function UserProfileSettings() {
    const [tab, setTab] = useState("1");
    
    const handleChangeTab = (_event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

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
            <ProfileProvider user={user} setUser={setUser} >
                <TabContext
                    value={tab}
                >
                    <TabList 
                        onChange={handleChangeTab}
                    >
                        <Tab label="Информация" value="1" />
                        <Tab label="Безопасность" value="2" />
                    </TabList>
                    <TabPanel 
                        value="1"
                        sx={{
                            p: 0,
                            mt: "25px",
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "25px"
                        }}
                    >
                        <Info />
                    </TabPanel>
                    <TabPanel
                        value="2"
                        sx={{
                            p: 0,
                        }}
                    >
                        <Security />
                    </TabPanel>
                </TabContext>
            </ProfileProvider>
        </AppContent>
    )
}