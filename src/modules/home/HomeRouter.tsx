import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecommendationsPage from "./pages/RecommendationsPage";

export enum HomeRoutes {
    RECOMMENDATIONS = "/recommendations"
}

export default function HomeRouter() {
    return (
        <Routes>
            <Route index element={<HomePage />}/>
            <Route path={HomeRoutes.RECOMMENDATIONS} element={<RecommendationsPage />} />
        </Routes>
    )
}