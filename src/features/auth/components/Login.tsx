import { Box } from "@mui/material";
import styles from "./Auth.module.css"
import { useState } from "react";
import { tokenService } from "../services/tokenService";
import { authService } from "../services/api/authService";
import Input from "./Input";
import Button from "../../../components/ui/Button";

function Login({ setSection, onSuccess }: { setSection: Function, onSuccess?: Function}) {
    const [wrongForm, setWrongForm] = useState(false);

    const [login, setLogin] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async() => {
        const {data, error} = await authService.login(login, password);

        if (error) {
            setWrongForm(true);
        }
        else {
            tokenService.saveAccessToken(data.access_token);
            tokenService.saveRefreshToken(data.refresh_token);

            onSuccess?.()
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