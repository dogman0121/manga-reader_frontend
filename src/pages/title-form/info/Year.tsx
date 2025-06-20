import { Box } from "@mui/material"
import { useFormContext, Controller } from "react-hook-form";
import FormInput from "../../../features/form/components/FormInput";


function Year() {
    const {control} = useFormContext();

    return (
        <Box>
            <Controller 
                name="year"
                control={control}
                defaultValue=""
                render={({field}) => (
                    <FormInput
                        {...field}
                        title="Год выпуска"
                        placeholder="Введите год"
                        fullWidth
                    />
                )}
            />
        </Box>
    )
}

export default Year;