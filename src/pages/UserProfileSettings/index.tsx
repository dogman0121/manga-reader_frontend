import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from "react";
import { AppContent } from '../../layouts/app-layout/AppLayout';


export default function UserProfileSettings() {
    const [tab, setTab] = useState("1");
    
    const handleChangeTab = (_event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    return (
        <AppContent>
            <form>
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
                        34534
                    </TabPanel>
                    <TabPanel
                        value="2"
                        sx={{
                            p: 0,
                        }}
                    >
                        dfdgf
                    </TabPanel>
                </TabContext>
            </form>
        </AppContent>
    )
}