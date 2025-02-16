import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import "./AuthModal.css"

function Login({ setSection }: { setSection: Function}) {
    return (
        <>
            <h2>Авторизация</h2>
            <Box
                className="form"
            >
                <TextField
                    label="Login"
                    variant="outlined"
                    color="secondary"
                    className="input"
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    color="secondary"
                    className="input"
                />
            </Box>
            <Box
                className="link forgot"
                sx={{
                    color: "primary.main",
                }}
                onClick={()=>{setSection("forgot")}}
            >
                Забыли пароль
            </Box>
            <Button
                variant="contained"
                className="submit"
            >
                Войти
            </Button>
            <Box
                className="change"
            >
                Нет учетной записи? 
                <Box
                    className="link"
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