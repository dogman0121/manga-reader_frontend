import { createContext } from "react"

interface FormStateContextProps {
    setIsLoading: Function,
    messageOpened: boolean,
    setMessageOpened: Function,
    setMessage: Function
}


const FormStateContext = createContext<FormStateContextProps>({
    setIsLoading: () => {}, 
    messageOpened: false,
    setMessageOpened: () => {},
    setMessage: () => {}
});

export default FormStateContext;