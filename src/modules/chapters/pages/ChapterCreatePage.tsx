import { useState } from "react";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import ChapterFormSingle from '../components/form/ChapterFormSingle';
import { chapterService } from '../service/api/chapterService';
import { Box, Breadcrumbs, CircularProgress, Typography, useTheme } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { generatePath } from '../../../routes';
import { DEVICE, useDeviceDetect } from '../../../hooks/useDeviceDetect';
import PageHeader from '../../../components/ui/PageHeader';
import { AppHeaderMobile } from '../../../layouts/app-layout/AppLayoutMobile';
import AppButton from '../../../components/ui/AppButton';
import { AppTab, AppTabContext, AppTabList, AppTabPanel } from '../../../components/ui/AppTabs';


export default function ChapterCreatePage() {
    const [tab, setTab] = useState("1");

    const theme = useTheme();

    const {device} = useDeviceDetect();

    const {slug} = useParams();

    const [isSending, setIsSending] = useState(false);

    const navigate = useNavigate()
    
    const handleChangeTab = (_event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    const handleAdd = async (form: FormData) => {
        setIsSending(true);

        form.append("manga", slug || "");
        await chapterService.addChapter(form);

        setIsSending(false);

        navigate(`/manga/${slug}`)
    } 

    return (
        <>
            {device == DEVICE.MOBILE && (
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
                            <Typography fontSize={"inherit"}>
                                Добавление главы
                            </Typography>
                            <AppButton 
                                variant="contained"
                                type='submit'
                                loading={isSending}
                                loadingIndicator={
                                    <CircularProgress
                                        size={"20px"}
                                        sx={{
                                            color: "#000000"
                                        }}
                                    />
                                }
                                form="chapter-form"
                                sx={{
                                    height: "34px"
                                }}
                            >
                                Отправить
                            </AppButton>
                        </Box>
                    }
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
                <AppTabContext
                    value={tab}
                >
                    <AppTabList 
                        onChange={handleChangeTab}
                        sx={{
                            mt: device != DEVICE.MOBILE ? theme.spacing(3) : undefined
                        }}
                    >
                        <AppTab label="Одиночное" value="1" />
                        <AppTab label="Множественное" value="2" />
                    </AppTabList>
                    <AppTabPanel 
                        value="1"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <ChapterFormSingle chapter={null} onSend={handleAdd}/>
                    </AppTabPanel>
                    <AppTabPanel
                        value="2"
                    >
                        В разработке
                    </AppTabPanel>
                </AppTabContext>
                {device != DEVICE.MOBILE && (
                    <AppButton 
                        variant="contained"
                        type='submit'
                        loading={isSending}
                        form="chapter-form"
                        sx={{
                            mt: theme.spacing(3),
                            height: "34px"
                        }}
                    >
                        Отправить
                    </AppButton>
                )}
            </AppContent>
        </>
        
    )
}