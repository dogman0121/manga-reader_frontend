import { useContext } from "react";
import FormContext from "../context/FormContext";

export default function useFormUtils() {
    const {setLoading, showNotification, showErrorBlur} = useContext(FormContext);

    return {setLoading, showNotification, showErrorBlur};
}