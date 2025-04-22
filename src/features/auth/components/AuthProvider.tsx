import { useState, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import AuthModal from "./AuthModal"
import { User, EMPTY_USER } from "../../../types/User";
import UserContext from "../../../context/UserAuthContext";
import fetchUser from "../../../services/api/fetchUser";

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [modalOpened, setModalOpened] = useState(false);

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        fetchUser()
            .then(({data: user}) => {
                if (user)
                    setUser(user);
                else
                    setUser(EMPTY_USER);
            })
            .catch(() => {
                console.log(123);
                setUser(EMPTY_USER);
            })
        
    }, [])


    return (
        <>
            <UserContext.Provider
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
            </UserContext.Provider>
        </>
    )
}

export default AuthProvider;