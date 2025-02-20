import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import styles from "./Auth.module.css"
import loginUser from "../services/api/loginUser";
import { useContext, useState } from "react";
import fetchUser from "../../../services/api/fetchUser";
import UserContext from "../../../context/UserContext";
import { saveAccessToken, saveRefreshToken } from "../../../utils/token";


function Login({ setSection }: { setSection: Function}) {
    const [wrongForm, setWrongForm] = useState(false);

    const [login, setLogin] = useState("");

    const [password, setPassword] = useState("");

    const { setUser } = useContext(UserContext);

    const handleLogin = async() => {
        const response = await loginUser(login, password);

        if (response.msg) {
            setWrongForm(true);
        }
        else {
            saveAccessToken(response.access_token);
            saveRefreshToken(response.refresh_token);

            setUser(await fetchUser());
        }

    }

    return (
        <>
            <h2>Авторизация</h2>
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
                <TextField
                    error={wrongForm}
                    label="Login"
                    variant="outlined"
                    color="secondary"
                    className={styles.Input}
                    onInput={(e) => {setLogin((e.target as HTMLInputElement).value)}}
                />

                <TextField
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