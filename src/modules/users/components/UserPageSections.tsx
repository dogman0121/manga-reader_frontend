import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';


export default function UserPageSections() {
    const [currentSection, setCurrentSection] = useState("1");

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setCurrentSection(newValue);
    };

    return (
        <TabContext value={currentSection}>
            <TabList onChange={handleChange}>
                <Tab value="1" label="Посты"/>
                <Tab value="2" label="Списки"/>
                <Tab value="3" label="Команды"/>
            </TabList>
            <TabPanel value="1">Посты</TabPanel>
            <TabPanel value="2">Списки</TabPanel>
            <TabPanel value="3">Команды</TabPanel>
        </TabContext>
    )
}