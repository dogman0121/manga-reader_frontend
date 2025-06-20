import { useEffect, useState } from "react";
import useFormUtils from "../../../features/form/hooks/useFormUtils";
import Title from "../types/Title";
import { titleService } from "../service/api/titleService";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs, Typography, useTheme } from "@mui/material";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import TitleForm, { compileFormData } from "../components/form/TitleForm";
import AddTitleForm from "../types/AddTitleForm";
import { generatePath, TitleRoutes } from "../../../routes";
import PageLoader from "../../../components/ui/PageLoader";
import { apiClient } from "../../../utils/apiClient";

export default function TitleUpdatePage() {
    const {setLoading, showNotification, showErrorBlur} = useFormUtils();

    const [titleLoading, setTitleLoading] = useState(true);

    const theme = useTheme();

    const {titleId} = useParams();

    const [title, setTitle] = useState<Title | undefined>();

    const onSubmit = async(data: AddTitleForm) => {
        console.log(123);
        const formData = compileFormData(data);

        setLoading(true);

        const {error} = await apiClient.sendForm(`/manga/${titleId}`, "PUT", formData);

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
        
        const {data: title, error} = await titleService.fetchTitle(parseInt(titleId || ""));

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
    }, [titleId]);

    if (titleLoading)
        return <PageLoader />

    return (
        <AppContent>
            <Breadcrumbs>
                    <Link 
                        to={generatePath(TitleRoutes.INDEX, {titleId: titleId || ""})}
                    >
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
                    <Typography
                        sx={{color: theme.typography.caption.color,}}
                    >Редактирование манги</Typography>
            </Breadcrumbs>
            <TitleForm onSubmit={onSubmit} title={title}/>
        </AppContent> 
    )
}