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

export const defaultTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "20px",
                    boxShadow: "none",
                    "&:hover": {
                        boxShadow: "none",
                    }
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderRadius: "16px",
                        },
                    },
                }
            }
        },
    }
})

export const lightTheme = createTheme(Object.assign(defaultTheme, {
    palette: {
        mode: "light",
        primary: {
            main: "#FFD600",
        },
        secondary: {
            main: "#656565"
        },
        background: {
            default: "#FFFFFF",
        },
        customBackgrounds: {
            header: "#FFF1AA",
            footer: "#FFD600"
        },
    },
}))

export const darkTheme = createTheme(Object.assign(defaultTheme, {
    palette: {
        mode: "dark",
        primary: {
            main: "#FFD600"
        },
        secondary: {
            main: "#D9D9D9"
        },
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
}));