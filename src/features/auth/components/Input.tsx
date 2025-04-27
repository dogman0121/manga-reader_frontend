import { TextField } from "@mui/material"

import {styled} from "@mui/material/styles"

const Input = styled(TextField)(({ theme }) => ({
    '& label.Mui-focused': {
      color: theme.vars.font.body1,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'yellow',
    },
    '& .MuiOutlinedInput-root': {

      '&.Mui-focused fieldset': {
        borderColor: theme.vars.font.body1,
      },
    },
    '& input': {
      color: theme.vars.font.body1
    }
}))

export default Input;