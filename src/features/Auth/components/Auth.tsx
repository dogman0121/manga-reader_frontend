import { useState } from 'react';
import Register from './Regsiter';
import Login from './Login';
import Forgot from './Forgot';
import Message from './Message';
import { Box } from '@mui/material';


function Auth({ section, onAuth }: { section: string, onAuth: Function }) {
    const [currentSection, setCurrentSection] = useState(section);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
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
                <Message 
                    title="Подтвержение почты"
                    information="На вашу почту отправлено письмо с подтверждением регистрации."
                />
            )}
        </Box>
    )
}

export default Auth;