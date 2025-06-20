import { Box } from "@mui/material";
import { SubmitHandler } from "react-hook-form";
import OpenGraphMeta from "../../components/OpenGraphMeta";
import AddTitleForm from "./types/AddTitleForm";
import TitleForm, { compileFormData } from "./TitleForm";
import { apiClient } from "../../utils/apiClient";
import Title from "../title/types/Title";
import { useContext } from "react";
import FormStateContext from "../../layouts/form-layout/FormStateContext";
import { AppContent } from "../../layouts/app-layout/AppLayout";



function AddTitle() {
    const {setIsLoading} = useContext(FormStateContext);

    const onSubmit: SubmitHandler<AddTitleForm> = async (data) => {
        const form = compileFormData(data);

        setIsLoading(true);
        try {
            const response = await apiClient.sendForm("/manga/add", "POST", form);

            if (response.ok){
                const title: Title = await response.json();
                window.location.href = `/manga/${title.id}`;
            }
        }
        catch {
            setIsLoading(false);
        }

        setIsLoading(false);
    }

    return (
        <AppContent>
            <OpenGraphMeta
                title="Добавить мангу | kanwoo"
                description="Здесь вы можете добавить мангу"
                url="kanwoo.ru/manga/add"
            />
            <Box>
                <TitleForm onSubmit={onSubmit}/>
            </Box>
        </AppContent>
    )
}

export default AddTitle;