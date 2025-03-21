import { createContext } from "react";

interface ModalContextProps {
    open: boolean,
    onClose: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined
}

const ModalContext = createContext<ModalContextProps>({open: false, onClose: () => {}});

export default ModalContext;