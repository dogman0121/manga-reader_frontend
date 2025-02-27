import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import styles from "./Auth.module.css"
import { useState } from "react";
import { authService } from "../services/api/authService";



function Forgot({ setSection }: { setSection: Function }) {
    const [email, setEmail] = useState("");

    const handleForgot = async () => {
        const response = await authService.forgot(email);
        if (response.msg === "Email sent") {
            setSection("forgot_message");
        }
    }

    return (
        <>
            <h2 className={styles.Header}>Восстановление пароля</h2>
            <Box
                className={styles.Form}
            >
                <TextField
                    label="Email"
                    variant="outlined"
                    color="secondary"
                    className={styles.Input}
                    onInput={(e) => {setEmail((e.target as HTMLInputElement).value)}}
                />
            </Box>
            <Button
                variant="contained"
                className={styles.Submit}
                onClick={handleForgot}
            >
                Отправить
            </Button>
        </>
    )
}

export default Forgot;