import { Route, Routes } from "react-router-dom";
import NotificationPage from "./pages/NotificationsPage";


export default function NotificationsRouter() {
    return (
        <Routes>
            <Route index element={<NotificationPage />}/>
        </Routes>
    )
}