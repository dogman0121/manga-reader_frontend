import { Modal, ModalProps } from "@mui/material";
import MobileModalWrapper from "./ModalWrapper";

export default function MobileModal({open, onClose, children}: ModalProps) {
    return (
        <MobileModalWrapper
            open={open}
            onClose={onClose}
        >
            <Modal
                open={open}
                onClose={onClose}
            >
                { children }
            </Modal>
        </MobileModalWrapper>
    )
}