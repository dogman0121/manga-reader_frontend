import { Box, Typography, TextField } from "@mui/material"
import { useFormContext, Controller } from "react-hook-form";

function Description() {
    const {control} = useFormContext();

    return (
        <Box>
            <Typography>Описание</Typography>
            <Box
                sx={{
                    mt: "5px"
                }}
            >
                <Controller 
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <TextField 
                            {...field}
                            fullWidth
                            multiline
                            minRows={5}
                            sx={{
                                "& input": {
                                    p: "12px 15px"
                                }
                            }}
                            placeholder="Введите описание"
                        />
                    )}
                />
            </Box>
        </Box>
    )
}

export default Description;