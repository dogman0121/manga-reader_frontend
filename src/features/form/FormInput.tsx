import { Box, Typography, TextField, TextFieldProps, styled } from "@mui/material";


const MyTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: "12px",
        },
    },
    "& input": {
        padding: "8px 15px"
    },
})

export interface FormInputProps {
    title?: string, 
}

export default function FormInput({title, name, className, sx, ...rest} : FormInputProps & TextFieldProps) {

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: title ? "5px" : undefined,
                ...sx
            }}
        >
            {title && (
                <Typography>{title}</Typography>
            )}
            <MyTextField
                {...rest}
                fullWidth
                sx={{
                    ...sx
                }}
            />  
        </Box>
    )
}