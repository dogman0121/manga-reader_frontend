import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from "react";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import SingleChapter from '../components/form/SingleChapterForm';
import { chapterService } from '../service/api/chapterService';
import { useParams } from 'react-router-dom';
import Chapter from '../../../types/Chapter';
import PageLoader from '../../../components/ui/PageLoader';
import FormModal from '../../../layouts/form-layout/FormModal';
import { Box, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import NotFound from '../../../pages/not-found/NotFound';
import Notification from '../../../components/ui/Notification';
import FormLoader from '../../../features/form/FormLoader';

export default function ChapterEditPage(){
    const {chapterId} = useParams();

    const [tab, setTab] = useState("1");
    
    const handleChangeTab = (_event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    const [chapter, setChapter] = useState<Chapter | undefined>(undefined);

    const [isLoading, setIsLoading] = useState(true);

    const [formIsLoading, setFormIsLoading] = useState(false);

    const [error, setError] = useState("");

    const [notification, setNotification] = useState(0);

    const handleCloseNotification = () => {
        setNotification(0);
    }

    const handleEdit = async (form: FormData) => {
        setFormIsLoading(true);
        const {error} = await chapterService.updateChapter(parseInt(chapterId || ""), form);

        setFormIsLoading(false);
        if (error)
            setNotification(1);
        else
            setNotification(2);

    }

    useEffect(() => {
        chapterService.getChapter(parseInt(chapterId || ""))
            .then(({data, error}) => {
                if (data)
                    setChapter(data);

                if (error)
                    setError(error.code)
                setIsLoading(false);
            })
        
    }, [chapterId])

    if (isLoading)
        return <PageLoader />

    if (error == "not_found")
        return <NotFound />

    return (
        <AppContent>
            <Typography fontSize={"40px"} lineHeight={1} mt={"30px"}>Редактирование главы</Typography>
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
                    <SingleChapter chapter={chapter} onSend={handleEdit}/>
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
            <FormModal 
                open={error != ""}
            >   
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "10px",
                        alignItems: "center"
                    }}
                >
                    <ErrorIcon 
                        sx={{
                            width: "35px",
                            height: "35px",
                            color: "#FF0000"
                        }}
                    />
                    <Box
                    >
                        {error === "forbidden" && (
                            <>
                                <Typography fontSize={18}>Упс... У вас нет доступа!</Typography>
                                <Typography fontSize={14}>Обратитесь к администраторам</Typography>
                            </>
                        )}
                    </Box>
                </Box>
            </FormModal>
            <Notification 
                open={notification == 1}
                variant="error"
                onClose={handleCloseNotification}
                message="При отправке данный произошла ошибка"
            />
            <Notification 
                open={notification == 2}
                variant="success"
                onClose={handleCloseNotification}
                message="Изменения успешно сохранены"
            />
            <FormLoader open={formIsLoading} />
        </AppContent>
    )
}