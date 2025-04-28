import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from "react";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import Info from "../components/form/Info";
import Members from '../components/form/Members';

export default function TeamCreatePage() {
    const [tab, setTab] = useState("1");
    
    const handleChangeTab = (_event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    return (
        <AppContent>
            <TabContext
                value={tab}
            >
                <TabList 
                    onChange={handleChangeTab}
                >
                    <Tab label="Информация" value="1" />
                    <Tab label="Участники" value="2" />
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
                    <Members />
                </TabPanel>
            </TabContext>
        </AppContent>
    )
}