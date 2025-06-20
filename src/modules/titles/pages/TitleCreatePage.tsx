import { Breadcrumbs, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import TitleForm, { compileFormData } from "../components/form/TitleForm";
import AddTitleForm from "../types/AddTitleForm";
import { apiClient } from "../../../utils/apiClient";
import useFormUtils from "../../../features/form/hooks/useFormUtils";
import { useNavigate } from "react-router-dom";
import { generatePath, TitleRoutes } from "../../../routes";


export default function TitleCreatePage() {
    const theme = useTheme();

    const {setLoading, showNotification} = useFormUtils();

    const navigate = useNavigate();

    const onSubmit = async (data: AddTitleForm) => {
        const formData = compileFormData(data);
        setLoading(true);

        const {data: title, error} = await apiClient.sendForm("/manga", "POST", formData);

        if (error)
            showNotification(
                "error",
                "При отправке формы произошла ошибка"
            )
        else 
            navigate(generatePath(TitleRoutes.INDEX, {titleId: title.id}))

        setLoading(false);
    }

    return (
        <>
            <AppContent>
                <Breadcrumbs>
                        <Typography
                            sx={{color: theme.typography.caption.color,}}
                        >Добавление манги</Typography>
                </Breadcrumbs>
                <TitleForm onSubmit={onSubmit}/>
            </AppContent> 
        </>
    )
}