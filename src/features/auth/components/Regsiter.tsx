import Box from "@mui/material/Box"
import styles from "./Auth.module.css"
import { useState } from "react";
import { authService } from "../services/api/authService";
import Input from "./Input";
import Button from "../../../components/ui/Button";


function Register({ setSection }: { setSection: Function }) {
    const [login, setLogin] = useState("");
    
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [repeatPassword, setRepeatPassword] = useState("");

    const [wrongForm, setWrongForm] = useState(0);

    const handleRegister = async() => {
        if (password == repeatPassword){
            const {data, error} = await authService.register(login, email, password);

            if (data?.msg == "Email sent"){
                setSection("verify_message");
                return;
            }

            
            if (error){
                if (error.detail.login){
                    switch (error.detail.login){
                        case "Login already taken":
                            setWrongForm(3);
                            break;
                    }
                }
                else if (error.detail.email) {
                    switch (error.detail.email){
                        case "Email already taken":
                            setWrongForm(2);
                            break;
                    }
                }
                else {
                    setWrongForm(10);
                }
            }

        }
        else {
            setWrongForm(1);
        }
    }

    return (
        <>
            <h2 className={styles.Header}>Регистрация</h2>
            { wrongForm !== 0 && (
                <Box
                    className={styles.Error}
                >
                    {wrongForm === 1 && <>Пароли не совпадают</>}
                    {wrongForm === 2 && <>Пользователь с такой почтой уже существует</>}
                    {wrongForm === 3 && <>Данное имя пользователя занято</>}
                    {wrongForm === 10 && <>Ошибка</>}
                </Box>
            )}
            <Box
                className={styles.Form}
            >
                <Input
                    error={wrongForm !== 0}
                    label="Login"
                    variant="outlined"
                    color="secondary"
                    className={styles.Input}
                    onInput={(e) => {setLogin((e.target as HTMLInputElement).value)}}
                />
                <Input
                    error={wrongForm !== 0}
                    label="Email"
                    variant="outlined"
                    type="email"
                    color="secondary"
                    className={styles.Input}
                    onInput={(e) => {setEmail((e.target as HTMLInputElement).value)}}
                />
                <Input
                    error={wrongForm !== 0}
                    label="Password"
                    variant="outlined"
                    type="password"
                    color="secondary"
                    className={styles.Input}
                    onInput={(e) => {setPassword((e.target as HTMLInputElement).value)}}
                />
                <Input
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
                    Войти
                </Box>
            </Box>
        </>
    )
}

export default Register;