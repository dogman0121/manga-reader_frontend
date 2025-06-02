import { Box, useTheme } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { Content } from "../../../layouts/app-layout/AppLayoutPC";

export default function ChapterLayout() {
    const theme = useTheme();

    const navigate = useNavigate();

    return (
        <>
            <Box component={"header"}
                sx={{
                    backgroundColor: theme.palette.customBackgrounds.header,
                }}
            >
                <Content>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            py: "15px"
                        }}
                    >
                        <WestRoundedIcon sx={{width: "24px", height: "24px"}} onClick={() => {navigate(-1)}}/>
                        <MoreVertRoundedIcon sx={{width: "24px", height: "24px"}}/>
                    </Box>
                </Content>
            </Box>
            <Box component={"main"}>
                <Outlet />
            </Box>
        </>
    )

}