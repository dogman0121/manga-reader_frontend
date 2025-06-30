import { styled, ToggleButton as MuiToggleButton } from "@mui/material";

const AppToggleButton = styled(MuiToggleButton)(({theme}) => ({
    padding: `3px ${theme.spacing(2)}`,
    textTransform: "none",
    border: "none",
    borderRadius: "6px",
    backgroundColor: theme.palette.background.paper,
    lineHeight: "1.4",

    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
    borderBottomRightRadius: "6px",
    borderBottomLeftRadius: "6px",

    "&.MuiToggleButtonGroup-firstButton": {
        borderRight: "inherit",
        borderTopRightRadius: "inherit",
        borderBottomRightRadius:"inherit",
    },

    "&.MuiToggleButtonGroup-lastButton": {
        borderLeft: "inherit",
        borderTopLeftRadius: "inherit",
        borderBottomLeftRadius: "inherit",
    },

    "&.MuiToggleButtonGroup-middleButton": {
        borderTopLeftRadius: "inherit",
        borderBottomLeftRadius: "inherit",
        borderTopRightRadius: "inherit",
        borderBottomRightRadius:"inherit",
    }
}))

export default AppToggleButton;