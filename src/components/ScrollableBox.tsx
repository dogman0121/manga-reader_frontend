import { Box, styled } from "@mui/material";

const ScrollableBox = styled(Box)({
    "&::-webkit-scrollbar": {
        width: "6px"
    },

    "&::-webkit-scrollbar-button": {
        display: "none"
    },

    "&::-webkit-scrollbar-thumb": {
        backgroundColor: "var(--mui-palette-secondary-main)",
        borderRadius: "8px",
        border: "0px solid var(--background-color)"
    }
})

export default ScrollableBox;