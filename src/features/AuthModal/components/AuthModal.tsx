import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal";
import { SyntheticEvent, useState } from "react";
import Register from "./Regsiter";
import Login from "./Login";
import Forgot from "./Forgot";

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
    borderRadius: "20px"
};

function AuthModal({open, onClose}: {open: boolean, onClose: React.EventHandler<SyntheticEvent>}) {
    const [section, setSection] = useState("login");

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={{...style}}>
                { section === "register" && (
                    <Register setSection={setSection} />
                )}
                { section === "login" && (
                    <Login setSection={setSection}/>
                )}
                { section === "forgot" && (
                    <Forgot />
                )}
            </Box>
        </Modal>
    )
}

export default AuthModal;