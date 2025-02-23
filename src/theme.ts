import { createTheme } from "@mui/material/styles";

declare module '@mui/material/styles' {
    interface PaletteOptions {
        customBackgrounds?: {
            header?: string,
            footer?: string,
            widget?: string,
            paper?: string
        }
    }

    interface Palette {
        customBackgrounds?: {
            header?: string,
            footer?: string,
            widget?: string,
            paper?: string
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
        }
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
            footer: "#FFD600",
            widget: "#FFFFFF",
            paper: "#FFFFFF"
        },
    },
    typography: {
        subtitle1: {
            fontSize: "14px",
            color: "#707070"            
        }
    }
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
            footer: "#06090E",
            widget: "#2c2c2c",
            paper: "#171717"
        },
    },
    typography: {
        subtitle1: {
            fontSize: "14px",
            color: "#D9D9D9"            
        }
    }
}));