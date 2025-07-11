import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";

export enum UsersRoutes { 
    ITEM = "/:userId",
    SETTINGS = "/settings"
}

export default function UsersRouter() {
    return (
        <Routes>
            <Route path={UsersRoutes.ITEM} element={<UserPage/>}/>
        </Routes>
    )
}