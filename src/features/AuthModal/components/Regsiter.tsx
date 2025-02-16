import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import "./AuthModal.css"

function Register({ setSection }: { setSection: Function}) {
    return (
        <>
            <h2>Регистрация</h2>
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
                    label="Email"
                    variant="outlined"
                    type="email"
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
                Зарегестрироваться
            </Button>
            <Box
                className="change"
            >
                Уже есть аккаунт? 
                <Box
                    className="link"
                    sx={{
                        color: "primary.main"
                    }}
                    onClick={()=>{setSection("login")}}
                >
                    Зарегестрироваться
                </Box>
            </Box>
        </>
    )
}

export default Register;