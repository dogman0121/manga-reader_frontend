import { Avatar, Box, Typography } from "@mui/material";
import { User } from "../types/User";
import { generatePath, UserRoutes } from "../routes";
import { Link } from "react-router-dom";



function UserItem({user}: {user: User}) {

    return (
        <Link to={generatePath(UserRoutes.INDEX, {userId: user.id})}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "10px",
                    alignItems: "center",
                    borderRadius: "6px",
                }}
            >
                <Avatar 
                    sx={{
                        width: "40px",
                        height: "40px"
                    }}
                    src={user.avatar}
                />
                <Typography fontSize={"14px"}>
                    {user.login}
                </Typography>
            </Box>
        </Link>
    )
}

export default function UserList({users} : {users: Array<User>}){
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px"
            }}
        >
            {users.map((user: User) => <UserItem user={user} key={user.id} />)}
        </Box>
    )
}

