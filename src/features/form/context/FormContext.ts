import { createContext } from "react";

interface FormContextProps {
    setLoading: Function,
    showNotification: Function,
    showErrorBlur: Function
}

const FormContext = createContext<FormContextProps>({
    setLoading: () => {}, 
    showNotification: () => {},
    showErrorBlur: () => {}

});

export default FormContext;