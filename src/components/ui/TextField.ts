import { TextField as MuiTextField, styled } from "@mui/material";

const TextField = styled(MuiTextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: "16px",
        },
    },
    "& input": {
        padding: "10px 15px"
    }
})

export default TextField;