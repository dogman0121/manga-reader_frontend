import { createContext } from "react";

interface MainBlurContextProps {
    setOpened: Function,
    setContent: Function
}

const MainBlurContext = createContext<MainBlurContextProps>({setOpened: () => {}, setContent: () => {}});

export default MainBlurContext