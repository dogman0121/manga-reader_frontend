import { createTheme } from "@mui/material/styles";
import { toggleButtonGroupClasses } from "@mui/material";

declare module '@mui/material/styles' {
    interface PaletteOptions {
        customBackgrounds?: {
            header?: string,
            footer?: string,
            widget1?: string,
            widget2?: string,
            widget3?: string,
            paper?: string
        }
    }

    interface Palette {
        customBackgrounds?: {
            header?: string,
            footer?: string,
            widget1?: string,
            widget2?: string,
            widget3?: string,
            paper?: string
        }
    }
}

const getTheme = (mode: "dark" | "light") => {
    return createTheme({
        cssVariables: true,
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: "20px",
                        boxShadow: "none",
                        "&:hover": {
                            boxShadow: "none",
                        },
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
                        "& input": {
                            padding: "10px 15px"
                        }
                    }
                }
            },
            MuiSelect: {
                styleOverrides: {
                    root: {
                        "& .MuiSelect-select": {
                            padding: "10px 15px",
                        }
                    }
                }
            },
            MuiAutocomplete: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            padding: "7px 14px"
                        },
                        "& input": {
                            padding: "3px 0 !important"
                        }
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
            },
        },
        palette: {
            mode,
            customBackgrounds: {
                header: "var(--header-color)",
                footer: "var(--footer-color)",
                widget1: "var(--widget1-color)",
                widget2: "var(--widget2-color)",
                widget3: "var(--widget3-color)",
                paper: "var(--paper-color)"
            },
        },
        typography: {
            body1: {
                color: "var(--text-color)"
            },
            subtitle1: {
                fontSize: "14px",
                color: "var(--subtitle1-text-color)"       
            }
        }
    })
}

// const darkTheme = createTheme(Object.assign(defaultTheme, {
//     palette: {
//         mode: "dark",
//         primary: {
//             main: "#FFD600"
//         },
//         secondary: {
//             main: "#2f2f2f"
//         },
//         background: {
//             default: "#171717",
//             paper: "#171717"
//         },
//         customBackgrounds: {
//             header: "#06090E",
//             footer: "#06090E",
//             widget1: "#131313",
//             widget2: "#2f2f2f",
//             widget3: "#131313",
//             paper: "#171717"
//         },
//     },
//     typography: {
//         body1: {
//             color: "#FFFFFF"
//         },
//         subtitle1: {
//             fontSize: "14px",
//             color: "#D9D9D9"            
//         }
//     }
// }));

export default getTheme;