import { createContext } from "react";
import Notification from "../types/Notification";

export interface NotificationsContextProps {
    notifications: Notification[],
    category: "all" | "comments" | "titles" | "marks"
    setCategory: Function
}

const NotificationsContext = createContext<NotificationsContextProps>({notifications:[], category: "all", setCategory: () => {}});

export default NotificationsContext;