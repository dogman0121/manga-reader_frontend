import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import styles from "./AuthModal.module.css"
import { useState } from "react";
import getRecoveryMessage from "../services/api/getRecoveryMessage";


function Forgot({ setSection }: { setSection: Function}) {
    const [email, setEmail] = useState("");

    const handleForgot = async () => {
        const response = await getRecoveryMessage(email);

        if (response.msg === "Email sent") {
            setSection("recovery");
        }
    }

    return (
        <>
            <h2>Восстановление пароля</h2>
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