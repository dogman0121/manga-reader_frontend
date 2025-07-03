import { TextFieldProps } from "@mui/material"
import FormInput, { FormInputProps } from "./FormInput"

export default function FormTextarea(props: FormInputProps & TextFieldProps) {
    return (
        <FormInput 
            {...props}
            multiline
            minRows={3}
            sx={{
                "& .MuiOutlinedInput-root": {
                    padding: "10px"
                },
                "& .MuiOutlinedInput-input": {
                    lineHeight: "1.7"
                }
            }}
        />
    )
}
