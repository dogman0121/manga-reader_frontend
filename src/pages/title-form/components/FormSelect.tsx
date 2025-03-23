import { styled } from "@mui/material/styles";
import { Select } from "@mui/material"

const FormSelect = styled(Select)({
    borderRadius: "16px",
    "& .MuiSelect-select": {
        padding: "10px 15px",
    }
})

export default FormSelect;