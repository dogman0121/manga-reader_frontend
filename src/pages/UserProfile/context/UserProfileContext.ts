import { createContext } from "react";
import { User } from "../../../types/User";

interface UserProfileContextProps {
    user: User | null,
    setUser: Function
}

const UserProfileContext = createContext<UserProfileContextProps>({user: null, setUser: ()=>{}});

export default UserProfileContext;