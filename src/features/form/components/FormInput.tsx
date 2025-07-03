import { Box, Typography, TextField, TextFieldProps, styled } from "@mui/material";


const MyTextField = styled(TextField)(({theme}) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.background.paper,
        borderRadius: "12px",
    },
    "& input": {
        padding: "6px 10px"
    },
}))

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