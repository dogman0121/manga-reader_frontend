import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface PaletteOptions {
        customBackgrounds?: {
            header?: string,
            footer?: string
        }
    }

    interface Palette {
        customBackgrounds?: {
            header?: string,
            footer?: string
        }
    }
}

export const lightTheme = createTheme({
    palette: {
        background: {
            default: "#FFFFFF",
        },
        customBackgrounds: {
            header: "#FFD600",
            footer: "#FFD600"
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "20px",
                },
            },
        },
    },
})

export const darkTheme = createTheme({
    colorSchemes: {
        dark: true
    },
    palette: {
        background: {
            paper: "#171717"
        },
        customBackgrounds: {
            header: "#06090E",
            footer: "#06090E"
        },
    },
    typography: {
    }
});