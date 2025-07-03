import { Box, SxProps } from "@mui/material";
import { User } from "../types/User";
import { generatePath, UserRoutes } from "../routes";
import { Link } from "react-router-dom";
import React from "react";
import { ListItem } from "./ListItem";

type UserItemProps = {
    user: User,
    endAdornment?: React.ReactElement,
    sx?: SxProps
}

export function UserItem({user, endAdornment}: UserItemProps) {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Link to={generatePath(UserRoutes.INDEX, {userId: user.id})}>
                <ListItem 
                    title={user.login}
                    subtitle={user.about}
                    img={user.avatar || ""}
                />
            </Link>
            {endAdornment}
        </Box>
    )
}

type UserListProps = {
    users: Array<User>
}  & Omit<UserItemProps, 'user'>

export default function UserList({users, ...props} : UserListProps){
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px"
            }}
        >
            {users.map((user: User) => <UserItem user={user} key={user.id} {...props}/>)}
        </Box>
    )
}

