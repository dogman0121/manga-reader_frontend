import { AppContent } from "../../../layouts/app-layout/AppLayout";
import TitleForm, { compileFormData } from "../components/form/TitleForm";
import AddTitleForm from "../types/AddTitleForm";
import { apiClient } from "../../../utils/apiClient";
import useFormUtils from "../../../features/form/hooks/useFormUtils";
import { Link, useNavigate } from "react-router-dom";
import { generatePath } from "../../../routes";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import { AppHeaderMobile } from "../../../layouts/app-layout/AppLayoutMobile";
import PageHeader from "../../../components/ui/PageHeader";
import { Breadcrumbs, Typography, useTheme } from "@mui/material";


export default function TitleCreatePage() {
    const {setLoading, showNotification} = useFormUtils();

    const navigate = useNavigate();

    const {device} = useDeviceDetect();

    const theme = useTheme()

    const onSubmit = async (data: AddTitleForm) => {
        const formData = compileFormData(data);
        setLoading(true);

        const {data: title, error} = await(await apiClient.sendForm("/manga", "POST", formData)).json();

        if (error)
            showNotification(
                "error",
                "При отправке формы произошла ошибка"
            )
        else 
            navigate(generatePath("/manga/:slug", {slug: title.slug}))

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
                                        color: theme.typography.caption.color,
                                        "&:hover": {
                                            textDecoration: "underline"
                                        }
                                    }}
                                >
                                    Главная  
                                </Typography>
                            </Link>
                            <Typography sx={{color: theme.typography.caption.color}}>Добавление тайтла</Typography>
                        </Breadcrumbs>
                    </>
                )}
                <TitleForm onSubmit={onSubmit}/>
            </AppContent> 
        </>
    )
}