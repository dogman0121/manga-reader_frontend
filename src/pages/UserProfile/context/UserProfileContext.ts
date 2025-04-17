import { createContext } from "react";
import { User } from "../../../types/User";

interface UserProfileContextProps {
    user: User | null
}

const UserProfileContext = createContext<UserProfileContextProps>({user: null});

export default UserProfileContext;