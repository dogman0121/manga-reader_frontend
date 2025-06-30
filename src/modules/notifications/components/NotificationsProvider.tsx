import { Children } from "react";
import NotificationContext from "../context/NotificationsContext";
import Notification from "../types/Notification";

export default function NotificationsProvider({
    children,
    notifications,
    category,
    setCategory
}: {
    children?: React.ReactNode[],
    notifications: Notification[],
    category: "all" | "comments" | "titles" | "marks",
    setCategory: Function
}) {
    return (
        <NotificationContext.Provider 
            value={{
                notifications: notifications,
                category: category,
                setCategory: setCategory
            }}
        >  
            {Children.map(children, child => child)}
        </NotificationContext.Provider>
    )
}