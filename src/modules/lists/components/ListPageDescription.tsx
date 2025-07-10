import { Typography, useTheme } from "@mui/material";
import useList from "../hooks/useList"

export default function ListPageDescription() {
    const {list} = useList();

    const theme = useTheme();
    
    if (!list || !list.description)
        return null;

    return (
        <Typography 
            sx={{
                mt: theme.spacing(2)
            }}
        >
            {list?.description}
        </Typography>
    )
}