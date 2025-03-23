import { Box } from "@mui/material";
import { SubmitHandler } from "react-hook-form";
import OpenGraphMeta from "../../components/OpenGraphMeta";
import AddTitleForm from "./types/AddTitleForm";
import TitleForm, { compileFormData } from "./TitleForm";
import { apiClient } from "../../utils/apiClient";
import Title from "../../types/Title";



function AddTitle() {
    const onSubmit: SubmitHandler<AddTitleForm> = async (data) => {
        const form = compileFormData(data);

        const response = await apiClient.sendForm("/manga/add", "POST", form);
        
        if (response.ok){
            console.log(213);
            const title: Title = await response.json();
            window.location.href = `/manga/${title.id}`;
        }
    }

    return (
        <>
            <OpenGraphMeta
                title="Добавить мангу | kanwoo"
                description="Здесь вы можете добавить мангу"
                url="kanwoo.ru/manga/add"
            />
            <Box>
                <TitleForm onSubmit={onSubmit}/>
            </Box>
        </>
    )
}

export default AddTitle;