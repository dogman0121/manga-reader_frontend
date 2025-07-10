import { Box, SxProps, Typography, useTheme } from "@mui/material";
import Modal from "../features/modal/Modal";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Children } from "react";

export default function AppModal({
    title,
    open,
    onClose,
    children,
    sx
}:{
    title: string,
    open: boolean,
    onClose: () => void,
    children: React.ReactElement,
    sx?: SxProps
}) {
    const theme = useTheme();

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                ...sx
            }}
        >
            <Box
                sx={{
                    p: theme.spacing(3),
                    borderRadius: "12px",
                    bgcolor: theme.palette.background.paper
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Typography fontSize={"16px"}>{title}</Typography>
                    <CloseRoundedIcon 
                        sx={{
                            cursor: "pointer",
                        }}
                        onClick={onClose}
                    />
                </Box>
                <Box
                    sx={{
                        mt: theme.spacing(2)
                    }}
                >
                    {Children.map(children, child => child)}
                </Box>
            </Box>
        </Modal>
    )
}