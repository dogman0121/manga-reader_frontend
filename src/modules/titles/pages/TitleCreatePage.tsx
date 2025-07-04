import { AppContent } from "../../../layouts/app-layout/AppLayout";
import TitleForm, { compileFormData } from "../components/form/TitleForm";
import AddTitleForm from "../types/AddTitleForm";
import { apiClient } from "../../../utils/apiClient";
import useFormUtils from "../../../features/form/hooks/useFormUtils";
import { Link, useNavigate } from "react-router-dom";
import { generatePath, TitleRoutes } from "../../../routes";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import { AppHeaderMobile } from "../../../layouts/app-layout/AppLayoutMobile";
import PageHeader from "../../../components/ui/PageHeader";
import { Breadcrumbs, Typography } from "@mui/material";


export default function TitleCreatePage() {
    const {setLoading, showNotification} = useFormUtils();

    const navigate = useNavigate();

    const {device} = useDeviceDetect();

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
            {device == DEVICE.MOBILE && (
                <AppHeaderMobile 
                    backArrow
                    firstLine={"Добавление тайтла"}
                />
            )}
            <AppContent>
                { device != DEVICE.MOBILE && (
                    <>
                        <PageHeader>Добавление тайтла</PageHeader>
                        <Breadcrumbs>
                            <Link to={generatePath("/")}>
                                <Typography
                                    sx={{
                                        "&:hover": {
                                            textDecoration: "underline"
                                        }
                                    }}
                                >
                                    Главная  
                                </Typography>
                            </Link>
                            <Typography>Изменение тайтла</Typography>
                        </Breadcrumbs>
                    </>
                )}
                <TitleForm onSubmit={onSubmit}/>
            </AppContent> 
        </>
    )
}