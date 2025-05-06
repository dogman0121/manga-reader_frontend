import { Box, MenuItem } from "@mui/material"
import { useFormContext, Controller } from "react-hook-form";
import FormSelect from "../../../features/form/FormSelect";


function Adult() {
    const { control } = useFormContext();

    return (
        <Box>
            <Controller 
                control={control}
                name="adult"
                defaultValue="1"
                render={({field}) => (
                    <FormSelect 
                        {...field}
                        title="Возрастное ограниченние"
                        fullWidth
                    >
                        <MenuItem value="1">Нет</MenuItem>
                        <MenuItem value="2">12+</MenuItem>
                        <MenuItem value="3">16+</MenuItem>
                        <MenuItem value="4">18+</MenuItem>
                    </FormSelect>
                )}
            />
        </Box>
    )
}

export default Adult;