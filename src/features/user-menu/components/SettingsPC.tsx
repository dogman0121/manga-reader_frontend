import { useTheme, Box, Accordion, AccordionSummary, AccordionDetails, Typography, Divider, Paper } from "@mui/material";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import ThemeSetting from "./ThemeSetting";


export default function SettingsPC() {
    const theme = useTheme();

    return (
        <Paper
            elevation={4}
            sx={{
                display: "flex",
                flexDirection: "row",
                p: "4px 6px",
                alignItems: "center",
                borderRadius: "6px",
                boxShadow: "none"
            }}
        >
            <Accordion
                sx={{
                    bgcolor: "transparent",
                    backgroundImage: "none",
                    boxShadow: "none",
                    width: "100%"
                }}
            >
                <AccordionSummary
                    expandIcon={<KeyboardArrowDownRoundedIcon/>}
                    sx={{
                        p: "5px 0",
                        minHeight: 0,

                        "&.Mui-expanded": {
                            minHeight: 0
                        },

                        "& .MuiAccordionSummary-content": {
                            m: 0,
                        },

                        "& .MuiAccordionSummary-content.Mui-expanded": {
                            m: 0
                        }
                    }}
                >
                    <SettingsIcon 
                        sx={{
                            width: "20px",
                            color: theme.typography.subtitle1.color
                        }}/>
                    <Typography sx={{ml: "3px"}}>Настройки</Typography>
                
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        p: "0 0 0 10px",
                        display: "flex",
                        flexDirection: "row"
                    }}
                >
                    <Divider orientation="vertical" variant="middle" flexItem/>
                    <Box
                        sx={{
                            p: "5px 5px 5px 10px",
                            width: "100%"
                        }}
                    >
                        <ThemeSetting />
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Paper>
    )
}