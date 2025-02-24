import { useState } from 'react';
import Register from './Regsiter';
import Login from './Login';
import Forgot from './Forgot';
import Message from './Message';
import Verify from './Verify';
import { Box } from '@mui/material';
import Recovery from './Recovery';


function Auth({ section, onAuth }: { section: string, onAuth: Function }) {
    const [currentSection, setCurrentSection] = useState(section);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "min(400px, 100vw)",
        bgcolor: 'background.paper',
        boxShadow: 24,
        padding: "24px 32px",
        border: "none",
        borderRadius: "20px",
        "&:focus": {
          outline: "none"
        }
    };

    return (
        <Box sx={{...style}}>
            { currentSection === "register" && (
                <Register setSection={setCurrentSection} />
            )}
            { currentSection === "login" && (
                <Login setSection={setCurrentSection} onSuccess={onAuth}/>
            )}
            { currentSection === "forgot" && (
                <Forgot setSection={setCurrentSection}/>
            )}
            { currentSection === "verify" && (
                <Verify />
            )}
            { currentSection === "recovery" && (
                <Recovery setSection={setCurrentSection}/>
            )}
            { currentSection === "forgot_message" && (
                <Message 
                    title="Восстановление пароля"
                    information="На вашу почту отправлено письмо с восстановлением пароля."
                />
            )}
            { currentSection === "verify_message" && (
                <Message 
                    title="Подтвержение почты"
                    information="На вашу почту отправлено письмо с подтверждением регистрации."
                />
            )}
        </Box>
    )
}

export default Auth;