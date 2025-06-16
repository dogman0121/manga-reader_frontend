import { useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import AuthModal from "./AuthModal"
import { User } from "../../../types/User";
import fetchUser from "../../../services/api/fetchUser";
import UserAuthContext from "../../../context/UserAuthContext";

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [modalOpened, setModalOpened] = useState(false);

    const [user, setUser] = useState<User | null | undefined>(undefined);

    useEffect(() => {
        fetchUser()
            .then(({data: user}) => {
                if (user)
                    setUser(user);
                else
                    setUser(null);
            })
            .catch(() => {
                setUser(null);
            })
        
    }, [])


    return (
        <>
            <UserAuthContext.Provider
                value={{
                    user: user,
                    setUser: setUser
                }}
            >
                <AuthContext.Provider
                    value={{
                        openModal: () => {setModalOpened(true)}
                    }}
                >
                        {children}
                        <AuthModal
                            open={modalOpened}
                            onClose={() => {setModalOpened(false)}}
                        />
                    
                </AuthContext.Provider>
            </UserAuthContext.Provider>
        </>
    )
}

export default AuthProvider;