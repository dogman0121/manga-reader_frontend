import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import styles from "./AuthModal.module.css"
import { useContext, useState } from "react";
import registerUser from "../services/api/registerUser";
import fetchUser from "../../../services/api/fetchUser";
import UserContext from "../../../context/UserContext";
import { saveAccessToken, saveRefreshToken } from "../../../utils/token";


function Register({ setSection }: { setSection: Function}) {
    const [login, setLogin] = useState("");
    
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [repeatPassword, setRepeatPassword] = useState("");

    const [wrongForm, setWrongForm] = useState(0);

    const { setUser } = useContext(UserContext);

    const handleRegister = async() => {
        if (password == repeatPassword){
            const response = await registerUser(login, email, password);

            if (response.msg) {
                switch(response.msg){
                    case "Email sent":
                        setSection("verify");
                        break;
                    case "Login already taken":
                        setWrongForm(3);
                        break;
                    case "Email already taken":
                        setWrongForm(2);
                        break;
                    default:
                        setWrongForm(10);
                }
            }
            else {
                saveAccessToken(response.access_token);
                saveRefreshToken(response.refresh_token);
    
                setUser(await fetchUser());
            }
        }
        else {
            setWrongForm(1);
        }
    }

    return (
        <>
            <h2>Регистрация</h2>
            { wrongForm !== 0 && (
                <Box
                    className={styles.Error}
                >
                    {wrongForm === 1 && <>Пароли не совпадают</>}
                    {wrongForm === 2 && <>Пользователь с такой почтой существует</>}
                    {wrongForm === 3 && <>Пользователь с таким именем уже существует</>}
                    {wrongForm === 10 && <>Ошибка</>}
                </Box>
            )}
            <Box
                className={styles.Form}
            >
                <TextField
                    error={wrongForm !== 0}
                    label="Login"
                    variant="outlined"
                    color="secondary"
                    className={styles.Input}
                    onInput={(e) => {setLogin((e.target as HTMLInputElement).value)}}
                />
                <TextField
                    error={wrongForm !== 0}
                    label="Email"
                    variant="outlined"
                    type="email"
                    color="secondary"
                    className={styles.Input}
                    onInput={(e) => {setEmail((e.target as HTMLInputElement).value)}}
                />
                <TextField
                    error={wrongForm !== 0}
                    label="Password"
                    variant="outlined"
                    type="password"
                    color="secondary"
                    className={styles.Input}
                    onInput={(e) => {setPassword((e.target as HTMLInputElement).value)}}
                />
                <TextField
                    error={wrongForm !== 0}
                    label="Repeat password"
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
                onClick={handleRegister}
            >
                Зарегестрироваться
            </Button>
            <Box
                className={styles.Change}
            >
                Уже есть аккаунт? 
                <Box
                    className={styles.Link}
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