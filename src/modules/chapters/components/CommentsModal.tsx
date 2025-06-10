import { Box, Typography, useTheme } from "@mui/material";
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { Content } from "../../../layouts/app-layout/AppLayoutPC";
import useModal from "../../../features/modal/useModal";
import Comments from "./Comments";

export default function CommentsModal() {

    const theme = useTheme();

    const {onClose} = useModal();

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                bgcolor: theme.palette.background.default
            }}
        >
            <Box
                sx={{
                    bgcolor: theme.palette.customBackgrounds.header
                }}
            >
                <Content>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            py: theme.spacing(2)
                        }}
                    >
                        <WestRoundedIcon 
                            sx={{width: "24px", height: "24px", cursor: "pointer"}}
                            onClick={() => {onClose ? onClose({}, "backdropClick") : null}} 
                        />
                        <Typography>Комментарии</Typography>
                        <MoreVertRoundedIcon sx={{width: "24px", height: "24px"}}
                        />
                    </Box>
                </Content>
            </Box>
            <Box 
                sx={{
                    mt:theme.spacing(4),
                    maxWidth: "640px",
                    mx: "auto",
                    px: theme.spacing(3)
                }}>
                <Comments />
            </Box>
        </Box>
    )
}