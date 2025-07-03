import { Route, Routes } from "react-router-dom";
import TitlePage from "./pages/TitlePage";
import TitleCreatePage from "./pages/TitleCreatePage";
import TitleUpdatePage from "./pages/TitleUpdatePage";

export enum TitleRoutes {
    INDEX = "/:slug",
    EDIT = "/:slug/edit",
    ADD = "/add"
}

export default function TitleRouter() {
    return (
        <Routes>
            <Route path={TitleRoutes.INDEX} element={<TitlePage />}/>
            <Route path={TitleRoutes.ADD} element={<TitleCreatePage />}/>
            <Route path={TitleRoutes.EDIT} element={<TitleUpdatePage />} />
        </Routes>
    )
}