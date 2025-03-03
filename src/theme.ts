import { createTheme } from "@mui/material/styles";
import { toggleButtonGroupClasses } from "@mui/material";

declare module '@mui/material/styles' {
    interface PaletteOptions {
        customBackgrounds?: {
            header?: string,
            footer?: string,
            widget1?: string,
            widhet2?: string,
            paper?: string
        }
    }

    interface Palette {
        customBackgrounds?: {
            header?: string,
            footer?: string,
            widget1?: string,
            widget2?: string,
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
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                }
            }
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    [`& .${toggleButtonGroupClasses.grouped}`]: {
                        border: 0,
                        borderRadius: "6px",
                        [`&.${toggleButtonGroupClasses.disabled}`]: {
                          border: 0,
                        },
                    },
                    [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
                    {
                        marginLeft: "5px",
                        borderLeft: '1px solid transparent',
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
            widget1: "#FFFFFF",
            widget2: "#F6F6F6",
            paper: "#F3F3F3"
        },
    },
    typography: {
        subtitle1: {
            fontSize: "14px",
            color: "#606060"            
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
            default: "#171717",
            paper: "#171717"
        },
        customBackgrounds: {
            header: "#06090E",
            footer: "#06090E",
            widget1: "#131313",
            widget2: "#2f2f2f",
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