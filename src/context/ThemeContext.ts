import { createContext } from "react"

interface ThemeContextProps {
    setTheme: Function
}

const ThemeContext = createContext<ThemeContextProps>({ setTheme: () => {} });

export default ThemeContext