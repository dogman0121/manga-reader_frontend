import { useContext } from "react";
import { EmptyUser } from "../../../types/User";
import UserContext from "../../../context/UserContext";
import { deleteAccessToken, deleteRefreshToken } from "../../../utils/token";
import { Box, Button, Typography } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function UserMenu(){
    const { setUser } = useContext(UserContext);

    const handleLogout = () => {
        deleteAccessToken()
        deleteRefreshToken()
        setUser(EmptyUser)
    }

    return (
        <Box>
            <Button
                sx={{
                    width: "100%",
                    borderRadius: "10px",
                    textTransform: "none",
                    fontSize: "15px"
                }}
                color="error"
                variant="text"
                onClick={handleLogout}
            >
                <ExitToAppIcon fontSize="small"/> 
                <Typography 
                    sx={{
                        ml: "5px"
                    }}
                >
                    Выход
                </Typography>
            </Button>
        </Box>
    )
}

export default UserMenu;