import { createContext } from "react";
import { EmptyUser, User } from "../types/User"

interface UserContextProps {
    user: User,
    setUser: Function
}

const UserContext = createContext<UserContextProps>({user: EmptyUser, setUser: () => {}});

export default UserContext;