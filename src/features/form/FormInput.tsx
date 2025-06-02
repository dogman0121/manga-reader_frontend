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

export type FormInputProps = {
    title?: string, 
} & TextFieldProps;

export default function FormInput({title, name, className, sx, ...rest} : FormInputProps) {

    return (
        <Box
            className={className}
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: title ? "5px" : undefined,
                ...sx
            }}
        >
            {title && (
                <Typography className="InputTitle">{title}</Typography>
            )}
            <MyTextField
                {...rest}
                fullWidth
            />  
        </Box>
    )
}