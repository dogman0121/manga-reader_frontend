import { createTheme } from "@mui/material";
import { darkTheme, lightTheme } from "../../theme";

export const getTheme = (mode: "light" | "dark") => {
    if (mode == "dark")
        return darkChapterTheme;
    return lightChapterTheme;
}

const darkChapterTheme = createTheme({
    ...darkTheme,
    palette: {
        ...darkTheme.palette,
        background: {
            ...darkTheme.palette.background,
            default: "#191919"
        },
        customBackgrounds: {
            ...darkTheme.palette.customBackgrounds,
            header: "#121212",
            footer: "#121212",
        }
    }
});

const lightChapterTheme = createTheme({
    ...lightTheme,
    palette: {
        ...lightTheme.palette,
        background: {
            ...lightTheme.palette.background,
            default: "#F2F2F3",
            defaultChannel: "242 242 243",
        },
        customBackgrounds: {
            ...lightTheme.palette.customBackgrounds,
            header: "#FFF1AA",
            footer: "#F0F0F0",
        }
    }
})