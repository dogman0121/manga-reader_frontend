import { Control, Controller } from "react-hook-form";
import { Box, Typography, TextField, TextFieldProps } from "@mui/material";


export interface FormInputProps {
    title: string, 
    control: Control<any, any>, 
    name: string, 
}

export default function FormInput({title, control, name,  sx, ...rest} : FormInputProps & TextFieldProps) {
    return (
        <Box>
            <Typography>{title}</Typography>
            <Controller 
                name={name}
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderRadius: "16px",
                                },
                            },
                            "& input": {
                                padding: "10px 15px"
                            },
                            ...sx
                        }}
                        {...rest}
                    />  
                )}
            />
        </Box>
    )
}