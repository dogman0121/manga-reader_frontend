import { useTheme } from "@mui/material"

export default function Meta() {
    const theme = useTheme();

    return (
        <>  
            <meta name="theme-color" content={theme.palette.customBackgrounds.header}/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        </>
    )
}