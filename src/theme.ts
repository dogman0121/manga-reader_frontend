import { createTheme } from "@mui/material/styles";
declare module '@mui/material/styles' {
    interface TypeBackground {
        defaultChannel?: string;
    }

    interface Palette {
        background: TypeBackground
        customBackgrounds: {
            header: string,
            footer: string,
            widget1: string
        }
    }

    interface PaletteOptions {
        background?: Partial<TypeBackground>
        customBackgrounds: {
            header: string,
            footer: string,
            widget1: string
        }
    }


}

// const getTheme = (mode: "dark" | "light") => {
//     return createTheme({
//         cssVariables: true,
//         components: {
//             MuiButton: {
//                 styleOverrides: {
//                     root: {
//                         borderRadius: "20px",
//                         boxShadow: "none",
//                         "&:hover": {
//                             boxShadow: "none",
//                         },
//                     }
//                 }
//             },
//             MuiTextField: {
//                 styleOverrides: {
//                     root: {
//                         '& .MuiOutlinedInput-root': {
//                             '& fieldset': {
//                                 borderRadius: "16px",
//                             },
//                         },
//                     }
//                 }
//             },
//             MuiSelect: {
//                 styleOverrides: {
//                     root: {
//                         "& .MuiSelect-select": {
//                             padding: "10px 15px",
//                         }
//                     }
//                 }
//             },
//             MuiAutocomplete: {
//                 styleOverrides: {
//                     root: {
//                         '& .MuiOutlinedInput-root': {
//                             padding: "7px 14px"
//                         },
//                         "& input": {
//                             padding: "3px 0 !important"
//                         }
//                     }
//                 }
//             },
//             MuiAccordion: {
//                 styleOverrides: {
//                     root: {
//                     }
//                 }
//             },
//             MuiToggleButtonGroup: {
//                 styleOverrides: {
//                     root: {
//                         [`& .${toggleButtonGroupClasses.grouped}`]: {
//                             border: 0,
//                             borderRadius: "6px",
//                             [`&.${toggleButtonGroupClasses.disabled}`]: {
//                               border: 0,
//                             },
//                         },
//                         [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
//                         {
//                             marginLeft: "5px",
//                             borderLeft: '1px solid transparent',
//                         },
//                     }
//                 }
//             },
//         },
//         palette: {
//             mode,
//             customBackgrounds: {
//                 header: "var(--header-color)",
//                 footer: "var(--footer-color)",
//                 widget1: "var(--widget1-color)",
//                 widget2: "var(--widget2-color)",
//                 widget3: "var(--widget3-color)",
//                 paper: "var(--paper-color)"
//             },
//         },
//         typography: {
//             body1: {
//                 color: "var(--text-color)"
//             },
//             subtitle1: {
//                 fontSize: "14px",
//                 color: "var(--subtitle1-text-color)"       
//             }
//         }
//     })
// }

export const getTheme = (mode: "light" | "dark") => {
    if (mode == "dark")
        return darkTheme;
    return lightTheme;
}

export const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#FFD600"
        },
        secondary: {
            main: "#E3E3E3",
        },
        background: {
            default: "#F2F2F3",
            defaultChannel: "242 242 243",
            paper: "#FFFFFF"
        },
        customBackgrounds: {
            header: "#FFF1AA",
            footer: "#FFD600",
            widget1: "#F4F4F5"
        }
    },
    spacing: 5,
    typography: {
        body1: {
            fontSize: "14px",
            color: "#000000"
        },
        caption: {
            color: "#606060"
        }
    }
})

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#FFD600"
        },
        secondary: {
            main: "#282828"
        },
        background: {
            default: "#121212",
            defaultChannel: "18 18 18",
            paper: "#1C1C1C"
        },
        customBackgrounds: {
            header: "#06090E",
            footer: "#06090E",
            widget1: "#212121"
        }
    },
    spacing: 5,
    typography: {
        fontFamily: "Open Sans, sans-serif",
        body1: {
            fontSize: "14px",
            color: "#e1e1e0"
        },
        caption: {
            color: "#BCBCBC"
        }
    }
})


export const getMobileTheme = (mode: "light" | "dark") => {
    if (mode == "dark")
        return darkMobileTheme;
    return lightMobileTheme;
}

const darkMobileTheme = createTheme({
    ...darkTheme, 
});


const lightMobileTheme = createTheme({
    ...lightTheme, 
    palette: {
        ...lightTheme.palette,
        background: {
            ...lightTheme.palette.background,
            default: "#FFFFFF",
            defaultChannel: "255  255 255"
        }
    }
})

export default getTheme;