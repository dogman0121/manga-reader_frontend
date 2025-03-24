import ModalContext from "./ModalContext";
import { Modal as MuiModal, Box, ModalProps } from "@mui/material";


function Modal({open, onClose, children, sx}: ModalProps) {
    return ( 
        <MuiModal
            open={open}
            onClose={onClose}

            sx={{
                ...sx
            }}
        >
            <ModalContext.Provider
                value={{
                    open: open,
                    onClose: onClose
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
            </ModalContext.Provider>
        </MuiModal>
    )
}

export default Modal;