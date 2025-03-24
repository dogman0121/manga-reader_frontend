import { Box, Typography } from "@mui/material"
import { useFormContext, Controller } from "react-hook-form";
import FormInput from "../components/FormInput";

function Name(){
    const {formState:{errors}, control} = useFormContext();

    return (
        <Box>
            <Typography>Название (на русском)</Typography>
            <Box
                sx={{
                    mt: "5px"
                }}
            >
                <Controller 
                    name="name"
                    control={control}
                    rules={{required: true}}
                    defaultValue=""
                    render={({ field, fieldState:{error} }) => (
                        <FormInput 
                            {...field}
                            fullWidth
                            error={error ? true : false}
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