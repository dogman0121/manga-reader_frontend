import { Box, MenuItem } from "@mui/material"
import { useFormContext, Controller } from "react-hook-form";
import FormSelect from "../../../features/form/FormSelect";


function Type() {
    const { control } = useFormContext();

    return (
        <Box>
            <Controller 
                control={control}
                name="type"
                defaultValue="1"
                render={({field}) => (
                    <FormSelect
                        {...field}
                        title="Тип"
                        fullWidth
                    >
                        <MenuItem value="1">нет</MenuItem>
                        <MenuItem value="2">манга</MenuItem>
                        <MenuItem value="3">манхва</MenuItem>
                        <MenuItem value="4">маньхуа</MenuItem>
                        <MenuItem value="5">рукомикс</MenuItem>
                    </FormSelect>
                )}
            />
        </Box>
    )
}

export default Type;