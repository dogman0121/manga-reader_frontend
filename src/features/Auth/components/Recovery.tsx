import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import styles from "./Auth.module.css"
import { useState } from "react";
import recoveryPassword from "../services/api/recoveryPassword";


function Recovery({ setSection }: { setSection: Function}) {
    const [wrongForm, setWrongForm] = useState(false);

    const [password, setPassword] = useState("");

    const [repeatPassword, setRepeatPassword] = useState("");

    const handleRecovery = async () => {
        if (password !== repeatPassword)
            return setWrongForm(true);

        const urlParams = new URLSearchParams(document.location.search);
        
        const token = urlParams.get("t");

        if (!token)
            return document.location.href = "https://kanwoo.ru/";

        const response = await recoveryPassword(token, password);

        if (response.msg === "Password changed")
            setSection("login");
    }

    return (
        <>
            <h2>Восстановление пароля</h2>
            { wrongForm && (
                <Box
                    className={styles.Error}
                >
                    Пароли не совпадают
                </Box>
            )}
            <Box
                className={styles.Form}
            >
                <TextField
                    error={wrongForm}
                    label="Password"
                    variant="outlined"
                    color="secondary"
                    className={styles.Input}
                    onInput={(e) => {setPassword((e.target as HTMLInputElement).value)}}
                />

                <TextField
                    error={wrongForm}
                    label="Repeat Password"
                    variant="outlined"
                    type="password"
                    color="secondary"
                    className={styles.Input}
                    onInput={(e) => {setRepeatPassword((e.target as HTMLInputElement).value)}}
                />
            </Box>
            <Button
                variant="contained"
                className={styles.Submit}
                onClick={handleRecovery}
            >
                Восстановить
            </Button>
        </>
    )
}

export default Recovery;