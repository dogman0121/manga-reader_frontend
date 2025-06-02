import { useContext } from "react";
import UserMenuContext from "../../../../context/UserMenuContext";
import UserAuthContext from "../../../../context/UserAuthContext";
import { authService } from "../../../auth/services/api/authService";
import { Button, Box } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function ExitButton() {
    const { setUser } = useContext(UserAuthContext);

    const { onClose } = useContext(UserMenuContext);

    const onLogout = () => {
        authService.logout();
        setUser(null);
    }

    return (
        <Button
            sx={{
                width: "100%",
                borderRadius: "10px",
                textTransform: "none",
                fontSize: "15px"
            }}
            color="error"
            variant="text"
            onClick={() => {onLogout(); onClose()}}
        >
            <ExitToAppIcon fontSize="small"/> 
            <Box
                sx={{
                    ml: "5px"
                }}
            >
                Выход
            </Box>
        </Button>
    )
}