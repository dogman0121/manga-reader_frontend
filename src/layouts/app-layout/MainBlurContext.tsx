import { createContext } from "react";

interface MainBlurContextProps {
    opened: boolean,
    content: React.ReactNode,
    setOpened: Function,
    setContent: Function
}

const MainBlurContext = createContext<MainBlurContextProps>({opened: false, content: <></>, setOpened: () => {}, setContent: () => {}});

export default MainBlurContext