import { createContext } from "react";

interface UserMenuContextProps {
    onClose: Function
}

const UserMenuContext = createContext<UserMenuContextProps>({onClose: () => {}});

export default UserMenuContext;