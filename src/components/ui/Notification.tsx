import { Snackbar, Box, SnackbarCloseReason } from "@mui/material"
import { SyntheticEvent } from "react"
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function Notification({ 
        open, 
        onClose,
        variant,
        message
    }: 
    {
        open: boolean, 
        onClose: (event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => any,
        message: string,
        variant: "success" | "error"
    }){
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{vertical: "bottom", horizontal: "center"}}>
            <Box
                sx={{
                    bgcolor: "var(--paper-color)",
                    p: "15px 10px",
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "10px",

                    borderRadius: "10px",

                    boxShadow: 2
                }}
            >
                {variant === "error" && (
                    <ErrorIcon  color="error"/>
                )}
                {variant === "success" && (
                    <CheckCircleIcon  color="success"/>
                )}                
                <Box>
                    { message }
                </Box>
            </Box>
        </Snackbar>
    )
}

export default Notification;