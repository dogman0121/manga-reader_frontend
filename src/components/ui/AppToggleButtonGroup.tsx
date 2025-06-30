import { styled, ToggleButtonGroup } from "@mui/material";

const AppToggleGroup = styled(ToggleButtonGroup)(({theme}) => ({
    columnGap: theme.spacing(1),
}))

export default AppToggleGroup;