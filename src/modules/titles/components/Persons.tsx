import { Avatar, Box, Chip, styled, Typography } from "@mui/material";
import useTitle from "../hooks/useTitle";
import { User } from "../../../types/User";

const MyChip = styled(Chip)(({theme}) => ({
    backgroundColor: theme.palette.secondary.main
}))

function PersonList({title, users}: {title: string, users: User[]}){
    if (users.length == 0)
        return null;

    return (
        <Box>
            <Typography fontSize={"16px"}>{title}</Typography>
            <Box mt="5px">
                {users.map(user => <MyChip key={user.id} avatar={<Avatar src={user.avatar}/>} label={user.login}/>)}
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
                columnGap: "15px"
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
                    title="Авторы"
                    users={title.artists}
                />
            )}
            {title.publishers && (
                <PersonList 
                    title="Авторы"
                    users={title.publishers}
                />
            )}
        </Box>
    )
}