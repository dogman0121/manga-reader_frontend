import { Box, Typography, useTheme } from "@mui/material";
import { User } from "../types/User"
import UserList from "./UserList";

interface UserListWidgetProps {
    title?: string,
    users: Array<User>,
    length: number,
    showMore?: Function
}


export default function UserListWidget({    
    title,
    users,
    length,
    showMore
} : UserListWidgetProps
){
    const theme = useTheme();

    return (
        <Box
            sx={{
                bgcolor: theme.vars.palette.customBackgrounds?.widget1,
                borderRadius: "12px",
                p: "10px 15px",

                display: "flex",
                flexDirection: "column",
                rowGap: "5px" 
            }}
        >
            {title && (
                <Typography 
                    variant="subtitle1" 
                    textTransform="uppercase"
                    mt="5px"
                >{title}</Typography>
            )}
            <Box>
                <UserList users={users.slice(0, length)} />
                {showMore && (
                    <Typography 
                        variant="subtitle1" 
                        onClick={showMore()}
                        sx={{
                            mt: "8px",
                            cursor: "pointer",
                            p: "3px 5px",
                            borderRadius: "6px",
                            textAlign: "center",
                            "&:hover": {
                                bgcolor: theme.vars.palette.customBackgrounds?.widget1
                            }
                        }}
                    >
                        показать еще {users.length - length}
                    </Typography>
                )}
            </Box>
        </Box>
    )
}