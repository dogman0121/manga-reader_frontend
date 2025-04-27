import { Box, Button } from "@mui/material";
import styles from "./Auth.module.css"
import { useState } from "react";
import { tokenService } from "../services/tokenService";
import { authService } from "../services/api/authService";
import Input from "./Input";

function Login({ setSection, onSuccess }: { setSection: Function, onSuccess?: Function}) {
    const [wrongForm, setWrongForm] = useState(false);

    const [login, setLogin] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async() => {
        const response = await authService.login(login, password);

        if (response.msg) {
            setWrongForm(true);
        }
        else {
            tokenService.saveAccessToken(response.access_token);
            tokenService.saveRefreshToken(response.refresh_token);

            onSuccess ? onSuccess() : null;
        }

    }

    return (
        <>
            <h2 className={styles.Header}>Авторизация</h2>
            { wrongForm && (
                <Box
                    className={styles.Error}
                >
                    Неправильное имя или пароль
                </Box>
            )}
            <Box
                className={styles.Form}
            >
                <Input
                    error={wrongForm}
                    label="Login"
                    variant="outlined"
                    color="secondary"
                    className={styles.Input}
                    onInput={(e) => {setLogin((e.target as HTMLInputElement).value)}}
                />

                <Input
                    error={wrongForm}
                    label="Password"
                    variant="outlined"
                    type="password"
                    color="secondary"
                    className={styles.Input}
                    onInput={(e) => {setPassword((e.target as HTMLInputElement).value)}}
                />
            </Box>
            <Box
                className={[styles.Link, styles.Forgot].join(" ")}
                sx={{
                    color: "primary.main",
                }}
                onClick={()=>{setSection("forgot")}}
            >
                Забыли пароль
            </Box>
            <Button
                variant="contained"
                className={styles.Submit}
                onClick={handleLogin}
            >
                Войти
            </Button>
            <Box
                className={styles.Change}
            >
                Нет учетной записи? 
                <Box
                    className={styles.Link}
                    sx={{
                        color: "primary.main"
                    }}
                    onClick={()=>{setSection("register")}}
                >
                    Зарегестрироваться
                </Box>
            </Box>
        </>
    )
}

export default Login;