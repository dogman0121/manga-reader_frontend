import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from "react";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import SingleChapter from '../components/form/SingleChapterForm';
import { chapterService } from '../service/api/chapterService';
import { Typography } from '@mui/material';


export default function ChapterCreatePage() {
    const [tab, setTab] = useState("1");
    
    const handleChangeTab = (_event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    const handleAdd = async (form: FormData) => {
        const response = await chapterService.addChapter(form);
        console.log(response);
    } 

    return (
        <AppContent>
            <Typography fontSize={"40px"} lineHeight={1} mt={"30px"}>Добавление главы</Typography>
            <TabContext
                value={tab}
            >
                <TabList 
                    onChange={handleChangeTab}
                >
                    <Tab label="Одиночное" value="1" />
                    <Tab label="Множественное" value="2" />
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
                    <SingleChapter onSend={handleAdd}/>
                </TabPanel>
                <TabPanel
                    value="2"
                    sx={{
                        p: 0,
                    }}
                >
                    12312
                </TabPanel>
            </TabContext>
        </AppContent>
    )
}