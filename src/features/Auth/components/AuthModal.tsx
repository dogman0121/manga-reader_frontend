import Modal from "@mui/material/Modal";
import Auth from "./Auth";
import { useState } from "react";


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
            <Auth section={section}/>
        </Modal>
    )
}

export default AuthModal;