import { Box, Typography, MenuItem } from "@mui/material"
import { useFormContext, Controller } from "react-hook-form";
import FormSelect from "../components/FormSelect";


function Adult() {
    const { control } = useFormContext();

    return (
        <Box>
            <Typography>Возрастное ограниченние</Typography>
            <Controller
                control={control}
                name="adult"
                defaultValue="1"
                render={({ field }) => (
                    <FormSelect
                        sx={{
                            mt: " 5px"
                        }}
                        fullWidth
                        {...field}
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