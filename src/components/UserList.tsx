import { Avatar, Box, SxProps, Typography } from "@mui/material";
import { User } from "../types/User";
import { generatePath, UserRoutes } from "../routes";
import { Link } from "react-router-dom";
import React from "react";

type UserItemProps = {
    user: User,
    endAdornment?: React.ReactElement,
    sx?: SxProps
}

function UserItem({user, endAdornment, sx}: UserItemProps) {

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                ...sx
            }}
        >
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
                    <Box>
                        <Typography fontSize={"16px"}>
                            {user.login}
                        </Typography>
                        <Typography 
                            variant="subtitle1" 
                            sx={{
                                lineHeight: "1.4",
                                maxWidth: "300px",
                                whiteSpace: "nowrap",
                                wordBreak: "break-all",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {user.about}
                        </Typography>
                    </Box>
                </Box>
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

