import { Checkbox, Box, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { getColorScheme } from "../../../utils/colorScheme";
import ThemeContext from "../../../context/ThemeContext";

const buttonWidgetStyle = {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
}

export default function ThemeSetting() {
    const [ isDarkMode, setIsDarkMode ] = useState(getColorScheme() === "dark");

    const { setTheme } = useContext(ThemeContext);

    return (
        <Box
            sx={buttonWidgetStyle}
        >
            <Typography>Тема</Typography>
            <Checkbox 
                sx={{
                    padding: 0
                }}
                checked={isDarkMode}
                onChange={
                    (e: React.ChangeEvent<HTMLInputElement>) => { 
                        setIsDarkMode(e.target.checked);
                        e.target.checked ? setTheme("dark") : setTheme("light") 
                    }
                }
            />
        </Box>
    )
}