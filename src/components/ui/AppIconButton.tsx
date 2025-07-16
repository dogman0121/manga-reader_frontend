import { IconButton, styled } from "@mui/material";

const AppIconButton = styled(IconButton)(({theme}) => ({
    padding: theme.spacing(0.8),
    color: theme.typography.body1.color
}))

export default AppIconButton;