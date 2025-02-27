import { createContext } from "react";

interface AuthContext {
    openModal: Function,
}

export const AuthContext = createContext({openModal: () => {}});