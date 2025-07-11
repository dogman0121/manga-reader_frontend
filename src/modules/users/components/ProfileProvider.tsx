import UserProfileContext from "../context/UserProfileContext";
import { User } from "../../../types/User";

export default function ProfileProvider({children, user, setUser}: {user: User | null, children: React.ReactNode, setUser: Function}) {
    return (
        <UserProfileContext.Provider value={{user: user, setUser: setUser}}>
            {children}
        </UserProfileContext.Provider>
    )
}