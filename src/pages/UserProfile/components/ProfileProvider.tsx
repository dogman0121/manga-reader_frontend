import UserProfileContext from "../context/UserProfileContext";
import { User } from "../../../types/User";

export default function ProfileProvider({children, user}: {user: User | null, children: React.ReactNode}) {
    return (
        <UserProfileContext.Provider value={{user: user}}>
            {children}
        </UserProfileContext.Provider>
    )
}