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
            footer: "#ffc200",
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
            fontSize: "12px",
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
            fontSize: "13px",
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