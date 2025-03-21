import { Box, Typography, TextField } from "@mui/material"
import { useFormContext, Controller } from "react-hook-form";

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
                        <TextField 
                            {...field}
                            fullWidth
                            error={error ? true : false}
                            sx={{
                                "& input": {
                                    p: "12px 15px"
                                }
                            }}
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