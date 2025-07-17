import { useEffect, useState } from "react";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import ChapterFormSingle from '../components/form/ChapterFormSingle';
import { chapterService } from '../service/api/chapterService';
import { Link, useParams } from 'react-router-dom';
import Chapter from '../types/Chapter';
import PageLoader from '../../../components/ui/PageLoader';
import { Box, Breadcrumbs, CircularProgress, Typography, useTheme } from '@mui/material';
import Notification from '../../../components/ui/Notification';
import { generatePath } from '../../../routes';
import PageHeader from '../../../components/ui/PageHeader';
import { DEVICE, useDeviceDetect } from '../../../hooks/useDeviceDetect';
import { AppHeaderMobile } from '../../../layouts/app-layout/AppLayoutMobile';
import AppButton from '../../../components/ui/AppButton';

const enum RESPONSES {
    OK,
    NOT_FOUND,
    BAD_REQUEST,
    FORBIDDEN
}

export default function ChapterEditPage(){
    const {chapterId} = useParams();

    const theme = useTheme();

    const {slug} = useParams();

    const [chapter, setChapter] = useState<Chapter | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const [isSending, setIsSending] = useState(false);

    const {device} = useDeviceDetect();

    const [error, setError] = useState(RESPONSES.OK);

    const [notificationOpen, setNotificationOpen] = useState(false);

    const handleEdit = async (form: FormData) => {
        setIsSending(true);

        const {error} = await chapterService.updateChapter(parseInt(chapterId || ""), form);

        setIsSending(false);

        switch(error?.code) {
            case "not_found":
                setError(RESPONSES.NOT_FOUND)
                break;
            case "bad_request":
                setError(RESPONSES.BAD_REQUEST)
                break;
            case "forbidden": 
                setError(RESPONSES.FORBIDDEN)
                break;
            default:
                setError(RESPONSES.OK)
                break;
        }

        setNotificationOpen(true);
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
                                Изменение главы
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
                        <PageHeader>Изменение главы</PageHeader>
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
                            >Изменение главы</Typography>
                        </Breadcrumbs>
                    </>
                )}
                <ChapterFormSingle 
                    chapter={chapter} 
                    onSend={handleEdit}
                    sx={{
                        mt: device != DEVICE.MOBILE ? theme.spacing(5) : undefined
                    }}
                />
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
                <Notification 
                    open={notificationOpen && error != RESPONSES.OK}
                    variant="error"
                    onClose={() => setNotificationOpen(false)}
                    message="При отправке данный произошла ошибка"
                />
                <Notification 
                    open={notificationOpen && error == RESPONSES.OK}
                    variant="success"
                    onClose={() => setNotificationOpen(false)}
                    message="Изменения успешно сохранены"
                />
            </AppContent>
        </>
        
    )
}