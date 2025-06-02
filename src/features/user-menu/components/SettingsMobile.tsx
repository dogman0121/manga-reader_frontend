import { Box, Typography, Paper } from "@mui/material";
import Widget from "../../../components/ui/Widget";
import ThemeSetting from "./ThemeSetting";

export default function SettingsMobile() {
    return (
        <>
            <Paper elevation={0}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px 5px",
                    height: "100%",
                }}
            >
                <Typography
                    sx={{
                        fontSize: "18px",
                        textAlign: "center"
                    }}
                >
                    Настройки
                </Typography>
                <Box
                    sx={{
                        mt: "15px",
                        display: "flex",
                        flexDirection:"column",
                        rowGap: "7px"
                    }}
                >
                    <Widget>
                        <ThemeSetting />
                    </Widget>
                </Box>
            </Paper>
        </>
    )
}