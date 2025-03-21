import { Box } from "@mui/material";
import { SubmitHandler } from "react-hook-form";
import OpenGraphMeta from "../../components/OpenGraphMeta";
import AddTitleForm from "./types/AddTitleForm";
import TitleForm, { compileFormData } from "./TitleForm";
import { apiClient } from "../../utils/apiClient";



function AddTitle() {
    const onSubmit: SubmitHandler<AddTitleForm> = (data) => {
        const form = compileFormData(data);

        apiClient.sendForm("/manga/add", "POST", form);
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