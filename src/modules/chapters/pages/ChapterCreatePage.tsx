import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from "react";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import SingleChapter from '../components/form/SingleChapterForm';
import { chapterService } from '../service/api/chapterService';
import { Breadcrumbs, Typography, useTheme } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { generatePath } from '../../../routes';
import { DEVICE, useDeviceDetect } from '../../../hooks/useDeviceDetect';
import PageHeader from '../../../components/ui/PageHeader';
import { AppHeaderMobile } from '../../../layouts/app-layout/AppLayoutMobile';


export default function ChapterCreatePage() {
    const [tab, setTab] = useState("1");

    const theme = useTheme();

    const {device} = useDeviceDetect();

    const {slug} = useParams();
    
    const handleChangeTab = (_event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    const handleAdd = async (form: FormData) => {
        form.append("manga", slug || "");
        await chapterService.addChapter(form);
    } 

    return (
        <>
            {device == DEVICE.MOBILE && (
                <AppHeaderMobile 
                    backArrow
                    firstLine={"Добавление главы"}
                />
            )}
            <AppContent>
                {device != DEVICE.MOBILE && (
                    <>
                        <PageHeader>Добавление главы</PageHeader>
                        <Breadcrumbs>
                            <Link
                                to={"/"}
                            >
                                <Typography
                                    sx={{
                                        color: theme.typography.caption.color,
                                        "&:hover": {
                                            textDecoration: "underline"
                                        }
                                    }}
                                >
                                    Главная
                                </Typography>
                            </Link>
                            <Link
                                to={generatePath("/manga/:slug", {slug: slug || ""})}
                            >
                                <Typography
                                    sx={{
                                        color: theme.typography.caption.color,
                                        "&:hover": {
                                            textDecoration: "underline"
                                        }
                                    }}
                                >
                                    Атака титанов
                                </Typography>
                            </Link>
                            <Typography
                                sx={{color: theme.typography.caption.color,}}
                            >Добавление главы</Typography>
                        </Breadcrumbs>
                    </>
                )}
                <TabContext
                    value={tab}
                >
                    <TabList 
                        onChange={handleChangeTab}
                        sx={{
                            mt: theme.spacing(1),
                            "& .MuiTab-root": {
                                textTransform: "capitalize"
                            }
                        }} 
                    >
                        <Tab label="Одиночное" value="1" />
                        <Tab label="Множественное" value="2" />
                    </TabList>
                    <TabPanel 
                        value="1"
                        sx={{
                            p: 0,
                            mt: theme.spacing(5),
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <SingleChapter chapter={null} onSend={handleAdd}/>
                    </TabPanel>
                    <TabPanel
                        value="2"
                        sx={{
                            p: 0,
                        }}
                    >
                        В разработке
                    </TabPanel>
                </TabContext>
            </AppContent>
        </>
        
    )
}