import { Box, MenuItem } from "@mui/material"
import { useFormContext, Controller } from "react-hook-form";
import FormSelect from "../../../features/form/FormSelect";


function Status() {
    const { control } = useFormContext();

    return (
        <Box>
            <Controller 
                control={control}
                name="status"
                defaultValue="1"
                render={({field}) => (
                    <FormSelect
                        {...field}
                        title="Статус"
                        fullWidth
                    >
                        <MenuItem value="1">не начат</MenuItem>
                        <MenuItem value="2">выпускается</MenuItem>
                        <MenuItem value="3">заброшен</MenuItem>
                        <MenuItem value="4">завершен</MenuItem>
                    </FormSelect>
                )}
            />
        </Box>
    )
}

export default Status