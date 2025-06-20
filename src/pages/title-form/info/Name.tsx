import { Box, Typography } from "@mui/material"
import { useFormContext, Controller } from "react-hook-form";
import FormInput from "../../../features/form/components/FormInput";

function Name(){
    const {formState:{errors}, control} = useFormContext();

    return (
        <Box>
            <Typography></Typography>
            <Box
                sx={{
                    mt: "5px"
                }}
            >
                <Controller 
                    name="name"
                    control={control}
                    render={({field}) => (
                        <FormInput
                            {...field}
                            title="Название (на русском)"
                            defaultValue=""
                            fullWidth
                            placeholder="Введите название"
                        />
                    )}
                />
                {errors.name && errors.name.type === "required" && <Typography color="error" fontSize={"0.80em"} mt={"4px"}>Поле не должно быть пустым!</Typography>}
            </Box>
        </Box>
    )
}

export default Name;