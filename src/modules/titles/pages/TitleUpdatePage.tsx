import { useEffect, useState } from "react";
import useFormUtils from "../../../features/form/hooks/useFormUtils";
import Title from "../types/Title";
import { titleService } from "../service/api/titleService";
import { generatePath, Link, useParams } from "react-router-dom";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import TitleForm, { compileFormData } from "../components/form/TitleForm";
import AddTitleForm from "../types/AddTitleForm";
import PageLoader from "../../../components/ui/PageLoader";
import { apiClient } from "../../../utils/apiClient";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import { AppHeaderMobile } from "../../../layouts/app-layout/AppLayoutMobile";
import PageHeader from "../../../components/ui/PageHeader";
import { Breadcrumbs, Typography, useTheme } from "@mui/material";

export default function TitleUpdatePage() {
    const {setLoading, showNotification, showErrorBlur} = useFormUtils();

    const [titleLoading, setTitleLoading] = useState(true);

    const {slug} = useParams();

    const [title, setTitle] = useState<Title | undefined>();

    const {device} = useDeviceDetect();

    const theme = useTheme()

    const onSubmit = async(data: AddTitleForm) => {
        const formData = compileFormData(data);

        setLoading(true);

        const {error} = await(await apiClient.sendForm(`/manga/${slug}`, "PUT", formData)).json();

        setLoading(false);

        if (error)
            showNotification(
                "error",
                "При отправке формы произошла ошибка"
            )
        else
            showNotification(
                "success",
                "Изменения сохранены успешно"
            )
    }

    const processTitle = async() => {
        setTitleLoading(true);
        
        const {data: title, error} = await titleService.fetchTitle(slug || "");

        setTitleLoading(false);

        if (!title || error?.code == "not_found") 
            return showErrorBlur(
                "Упс... Такого тайтла нет!",
                "Проверьте правильность URL"
            )

        if (!title.permissions?.edit)
            return showErrorBlur(
                "Упс... У вас нет доступа!",
                "Обратитесь к администраторам"
            )

        setTitle(title);
    }

    useEffect(() => {
        processTitle();

        return () => {};
    }, [slug]);

    if (titleLoading)
        return <PageLoader />

    return (
        <>
            {device == DEVICE.MOBILE && (
                <AppHeaderMobile 
                    backArrow
                    firstLine={"Изменение тайтла"}
                />
            )}
            <AppContent>
                { device != DEVICE.MOBILE && (
                    <>
                        <PageHeader>Изменение тайтла</PageHeader>
                        <Breadcrumbs>
                            <Link to={"/"}>
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
                            <Link to={generatePath("/manga/:slug", {slug: title?.slug || ""})}>
                                <Typography
                                    sx={{
                                        color: theme.typography.caption.color,
                                        "&:hover": {
                                            textDecoration: "underline"
                                        }
                                    }}
                                >
                                    {title?.name}    
                                </Typography>
                            </Link>
                            <Typography sx={{color: theme.typography.caption.color}}>Изменение тайтла</Typography>
                        </Breadcrumbs>
                    </>
                )}
                <TitleForm onSubmit={onSubmit} title={title}/>
            </AppContent> 
        </>
        
    )
}