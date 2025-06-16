import Modal from "@mui/material/Modal";
import Auth from "./Auth";
import { useContext, useState } from "react";
import fetchUser from "../../../services/api/fetchUser";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import MobileModal from "../../../components/ui/MobileModal";
import UserAuthContext from "../../../context/UserAuthContext";


function AuthModal({open, onClose}: {open: boolean, onClose: Function}) {
    const [section, setSection] = useState("login");

    const { device } = useDeviceDetect();

    const {setUser} = useContext(UserAuthContext);

    const onAuth = async() => {
        const {data: user} = await fetchUser();
        setUser(user);
        handleClose();
    }

    const handleClose = () => {
        onClose();
        setSection("login")
    }

    return (
        <>
            {device === DEVICE.MOBILE ?
                (
                <MobileModal
                    open={open}
                    onClose={handleClose}
                >
                    <Auth 
                        section={section}
                        onAuth={onAuth}
                    />
                </MobileModal>
            )
                :
            (
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
        </>
    )
}

export default AuthModal;