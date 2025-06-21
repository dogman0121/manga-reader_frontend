import { Avatar, Box, Chip, styled, Typography } from "@mui/material";
import useTitle from "../hooks/useTitle";
import { User } from "../../../types/User";
import { Link } from "react-router-dom";
import { generatePath, UserRoutes } from "../../../routes";

const MyChip = styled(Chip)(({theme}) => ({
    backgroundColor: theme.palette.secondary.main
}))

function PersonList({title, users}: {title: string, users: User[]}){
    if (users.length == 0)
        return null;

    return (
        <Box>
            <Typography fontSize={"16px"}>{title}</Typography>
            <Box 
                sx={{
                    mt: "5px",
                    display: "flex",
                    flexDirection: "row",
                    gap: "5px",
                    flexWrap: "wrap"
                }}
            >
                {users.map(user => (
                    <Link to={generatePath(UserRoutes.INDEX, {userId: user.id})} key={user.id}>
                        <MyChip key={user.id} avatar={<Avatar src={user.avatar}/>} label={user.login}/>
                    </Link> 
                ))}
            </Box>
        </Box>
    )
}

export default function Persons() {
    const {title} = useTitle();


    if (title == null || !(title.authors?.length || title.artists?.length || title.artists))
        return null;

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "15px",
                rowGap: "5px",
                flexWrap: "wrap"
            }}
        >
            {title.authors && (
                <PersonList 
                    title="Авторы"
                    users={title.authors}
                />
            )}
            {title.artists && (
                <PersonList 
                    title="Художники"
                    users={title.artists}
                />
            )}
            {title.publishers && (
                <PersonList 
                    title="Издатели"
                    users={title.publishers}
                />
            )}
        </Box>
    )
}