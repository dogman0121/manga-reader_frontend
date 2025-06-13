import { styled } from "@mui/material";
import FormInput, { FormInputProps } from "../../../features/form/FormInput";
import useFilter from "../hooks/useFilter";
import { ChangeEvent } from "react";

const MyInput = styled(FormInput)(() => ({
    '& .InputTitle': {
        lineHeight: "16px",
    },
    '& .MuiOutlinedInput-root': {
        backgroundColor: "transparent !important",
        '& fieldset': {
            borderRadius: "12px",
        },
    },
    "& input": {
        fontSize: "14px",
        lineHeight: "21px",
        padding: "10px 0",
        height: "auto"
    }
}));

type FilterInputProps = {
    name: string
} & FormInputProps

export default function FilterInput({name, ...props}: FilterInputProps) {
    const {value, setValue} = useFilter(name);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {
            target: {value}
        } = event;

        setValue([value]);
    }

    return (
        <MyInput 
            onChange={handleChange}
            value={value.length ? value[0] : ""}
            {...props}
        />
    )
}