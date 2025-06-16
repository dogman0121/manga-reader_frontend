import { TextField } from "@mui/material"

import {styled} from "@mui/material/styles"

const Input = styled(TextField)(({ theme }) => ({
    '& label': {
      color: theme.typography.caption.color
    },
    '& label.Mui-focused': {
      color: theme.typography.body1.color,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'yellow',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: "12px",
      '&.Mui-focused fieldset': {
        borderColor: theme.typography.body1.color,
      },
    },
}))

export default Input;