import { createContext } from "react";
import { EMPTY_USER, User } from "../types/User"

interface UserAuthContextProps {
    user: User | null,
    setUser: Function
}

const UserAuthContext = createContext<UserAuthContextProps>({user: EMPTY_USER, setUser: () => {}});

export default UserAuthContext;