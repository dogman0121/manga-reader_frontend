import ModalContext from "./ModalContext";
import { Modal as MuiModal, Box, ModalProps } from "@mui/material";


function Modal({open, onClose, children, sx}: ModalProps) {
    return (
        <ModalContext.Provider
            value={{
                open: open,
                onClose: onClose
            }}
        >  
            <MuiModal
                open={open}
                onClose={onClose}

                sx={{
                    ...sx
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",

                        maxWidth: "100%",

                        transform: "translate(-50%, -50%)",

                        "&:focus": {
                           outline: "none"
                        },
                    }}
                >
                    {children}
                </Box>
            </MuiModal>
        </ModalContext.Provider>
    )
}

export default Modal;