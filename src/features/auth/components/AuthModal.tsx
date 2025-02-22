import Modal from "@mui/material/Modal";
import Auth from "./Auth";
import { useContext, useState } from "react";
import UserContext from "../../../context/UserContext";
import fetchUser from "../../../services/api/fetchUser";


function AuthModal({open, onClose}: {open: boolean, onClose: Function}) {
    const [section, setSection] = useState("login");

    const {setUser} = useContext(UserContext);

    const onAuth = async() => {
        setUser(await fetchUser());
        handleClose();
    }

    const handleClose = () => {
        onClose();
        setSection("login")
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Auth 
                section={section}
                onAuth={onAuth}
            />
        </Modal>
    )
}

export default AuthModal;