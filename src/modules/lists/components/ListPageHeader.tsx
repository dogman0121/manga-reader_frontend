import { Avatar, Box, Chip, Typography, useTheme } from "@mui/material";
import PageHeader from "../../../components/ui/PageHeader";
import useList from "../hooks/useList";
import { generatePath, Link } from "react-router-dom";

export default function ListPageHeader() {
    const {list} = useList();

    const theme = useTheme();

    if (!list)
        return null;

    return (
        <Box>
            <PageHeader>{list.name}</PageHeader>
            <Box 
                sx={{
                    mt: theme.spacing(1),
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <Typography>
                    Автор:
                </Typography>
                <Link to={generatePath("/users/:userId", {userId: list.creator.id.toString()})}>
                    <Chip 
                        sx={{
                            ml: theme.spacing(2)
                        }}
                        avatar={<Avatar src={list.creator.avatar}/>} 
                        label={list.creator.login}
                    />
                </Link> 
            </Box>
        </Box>
    )
}