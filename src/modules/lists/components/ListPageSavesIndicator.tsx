import { Box, Typography, useTheme } from "@mui/material";
import useList from "../hooks/useList";
import TurnedInNotRoundedIcon from '@mui/icons-material/TurnedInNotRounded';

export default function ListPageSavesIndicator() {
    const theme = useTheme();

    const {list} = useList();

    if (!list)
        return null;

    return (
        <Box
            sx={{
                mt: theme.spacing(2),
                display: "flex",
                flexDirection: "row",
                gap: theme.spacing(1),
                alignItems: "center"
            }}
        >
            <TurnedInNotRoundedIcon 
                sx={{
                    color: theme.typography.caption.color,
                    width: "18px",
                    height: "18px"
                }}
            />
            <Typography variant="caption">{list.saves_count} сохранений</Typography>
        </Box>
    )
}