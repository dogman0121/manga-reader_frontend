import { Box, Drawer, DrawerProps, ToggleButtonGroup, ToggleButton, styled, useTheme, Typography, Switch } from "@mui/material";
import { ChangeEvent, useContext } from "react";
import ReaderSettingsContext from "../context/ReaderSettingsContext";

const OptionsList = styled(ToggleButtonGroup)(({ theme }) => ({
    borderRadius: "12px",
    border: `1px solid ${theme.palette.secondary.main}`,
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
    columnGap: theme.spacing(1),
}))


const Option = styled(ToggleButton)(({ theme }) => ({
    border: "none",
    borderRadius: "8px",
    width: "100%",
    textTransform: "capitalize",
    padding: theme.spacing(1),
    color: theme.typography.body1.color,
    lineHeight: 1.4,

    "&.Mui-selected": {
        background: theme.palette.secondary.main,
    },
    "&.MuiToggleButtonGroup-lastButton": {
        borderTopLeftRadius: "8px",
        borderBottomLeftRadius: "8px"
    },
    "&.MuiToggleButtonGroup-firstButton": {
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
    }
}))

export default function ReaderSettings({...props}: DrawerProps) {
    const theme = useTheme();

    const {settings, setSettings} = useContext(ReaderSettingsContext);

    const handleChangeReadingMode = (
        _event: React.MouseEvent<HTMLElement>,
        newMode: "vertical" | "horizontal",
    ) => {
        const s = Object.assign({}, settings);
        s.readingMode = newMode;
        setSettings(s);
    };

    const handleChangeInfinityChapter = (event: ChangeEvent<HTMLInputElement>) => {
        const s = Object.assign({}, settings);
        s.infinityChapter = event.target.checked;
        setSettings(s);
    }

    return (
        <Drawer
            {...props}
        >
            <Box
                sx={{
                    width: "400px",
                    padding: `${theme.spacing(5)} ${theme.spacing(3)}`
                }}
            >
                <Typography textAlign={"center"} fontSize={"16px"}>Настройки</Typography>
                <Box 
                    sx={{
                        mt: theme.spacing(4),
                        display: "flex",
                        flexDirection: "column",
                        rowGap: theme.spacing(3)
                    }}    
                >
                    <Box>
                        <Typography>Режим чтения</Typography>
                        <OptionsList 
                            exclusive
                            sx={{mt: "5px"}}
                            value={settings.readingMode}
                            onChange={handleChangeReadingMode}
                        >
                            <Option value="horizontal">Горизонтальный</Option>
                            <Option value="vertical">Вертикальный</Option>
                        </OptionsList>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}
                    >
                        <Typography>Бесконечная глава</Typography>
                        <Switch 
                            onChange={handleChangeInfinityChapter} 
                            checked={settings.infinityChapter}
                        />
                    </Box>
                </Box>
            </Box>
        </Drawer>
    )
}