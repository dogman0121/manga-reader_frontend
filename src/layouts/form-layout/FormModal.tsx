import { styled } from "@mui/material";
import Modal from "../../features/modal/Modal";
import { getColorScheme } from "../../utils/colorScheme";


const FormModal = styled(Modal)({
    "& .MuiBackdrop-root": {
        bgcolor: getColorScheme() === "light" ? "rgb(255 255 255 / 50%)" : "rgba(0, 0, 0, 0.7)"
    }
}) 

export default FormModal;