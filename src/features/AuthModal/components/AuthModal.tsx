import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal";
import { useState } from "react";
import Register from "./Regsiter";
import Login from "./Login";
import Forgot from "./Forgot";
import Message from "./Message";

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

function AuthModal({open, onClose}: {open: boolean, onClose: Function}) {
    const [section, setSection] = useState("login");

    return (
        <Modal
            open={open}
            onClose={() => {
                onClose();
                setSection("login")
            }}
        >
            <Box sx={{...style}}>
                { section === "register" && (
                    <Register setSection={setSection} />
                )}
                { section === "login" && (
                    <Login setSection={setSection}/>
                )}
                { section === "forgot" && (
                    <Forgot setSection={setSection}/>
                )}
                { section === "verify" && (
                    <Message 
                        title="Подтвержение почты"
                        information="На вашу почту отправлено письмо с подтверждением регистрации."
                    />
                )}
            </Box>
        </Modal>
    )
}

export default AuthModal;