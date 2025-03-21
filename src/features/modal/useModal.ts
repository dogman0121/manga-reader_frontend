import { useContext } from "react"
import ModalContext from "./ModalContext"

const useModal = () => {
    return useContext(ModalContext);
}

export default useModal;