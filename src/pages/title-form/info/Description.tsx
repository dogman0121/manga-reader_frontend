import { Box } from "@mui/material"
import { useFormContext, Controller } from "react-hook-form";
import FormTextarea from "../../../features/form/components/FormTextarea";

function Description() {
    const {control} = useFormContext();

    return (
        <Box>
            <Controller 
                name="description"
                control={control}
                render={({field}) => (
                    <FormTextarea 
                        {...field}
                        title="Описание"
                        defaultValue=""
                        placeholder="Введите описание"
                    />
                )}
            />
        </Box>
    )
}

export default Description;