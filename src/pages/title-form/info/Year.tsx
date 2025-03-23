import { Box, Typography, TextField } from "@mui/material"
import { useFormContext, Controller } from "react-hook-form";


function Year() {
    const {control} = useFormContext();

    return (
        <Box>
            <Typography>Год выпуска</Typography>
            <Box
                sx={{
                    mt: "5px"
                }}
            >
                <Controller 
                    name="year"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField 
                            {...field}
                            fullWidth
                            sx={{
                                "& input": {
                                    p: "10px 15px"
                                }
                            }}
                            placeholder="Введите год"
                        />
                    )}
                />
            </Box>
        </Box>
    )
}

export default Year;