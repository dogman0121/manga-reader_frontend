import { Box, DrawerProps, ToggleButtonGroup, ToggleButton, styled, useTheme, Typography, Switch, Backdrop } from "@mui/material";
import Drawer from "../../../components/ui/Drawer";

import { ChangeEvent, useContext } from "react";
import ReaderSettingsContext from "../context/ReaderSettingsContext";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";

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

function SettingsInner() {
    const theme = useTheme()

    const {settings, setSettings} = useContext(ReaderSettingsContext);

    const handleChangeReadingMode = (
        _event: React.MouseEvent<HTMLElement>,
        newMode: "vertical" | "horizontal",
    ) => {
        console.log(newMode);
        if (!newMode)
            return;
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
        <>
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
        </>
    )
}

function ReaderSettingsPC({...props}: DrawerProps) {
    return (
        <Drawer
            anchor="right"
            elevation={0}
            {...props}
        >
            <Box
                sx={{
                    width: "400px",
                }}
            >
                <SettingsInner />
            </Box>
        </Drawer>
    )
}


function ReaderSettingsMobile({open, onClose}: {open: boolean, onClose: () => void}) {
    const theme = useTheme();

    return (
        <>
            <Backdrop
                open={open}
                onClick={(event) => {event.stopPropagation();onClose();}}
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    transition: 'opacity 0.3s ease',
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? 'auto' : 'none'
                }}
            >    
                <Box
                    sx={{
                        px: theme.spacing(3),
                        width: "100%",
                        position: "absolute",
                        bottom: theme.spacing(4),
                    }}
                    onClick={(event) => {event.stopPropagation()}}
                >
                    <Box
                        sx={{
                            p: theme.spacing(3),
                            bgcolor: theme.palette.background.paper,
                            borderRadius: "12px"
                        }}
                    >
                        <SettingsInner />
                    </Box>
                </Box>
            </Backdrop>
        </>
    )
}


export default function ReaderSettings({open, onClose}: {open: boolean, onClose: () => void}) {
    const {device} = useDeviceDetect();

    return (
        <>
            {device == DEVICE.PC ?
                <ReaderSettingsPC open={open} onClose={onClose}/>
                :
                <ReaderSettingsMobile open={open} onClose={onClose}/>
            }
        </>
    )
}