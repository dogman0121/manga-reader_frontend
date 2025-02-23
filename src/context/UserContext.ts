import { createContext } from "react";
import { EMPTY_USER, User } from "../types/User"

interface UserContextProps {
    user: User,
    setUser: Function
}

const UserContext = createContext<UserContextProps>({user: EMPTY_USER, setUser: () => {}});

export default UserContext;