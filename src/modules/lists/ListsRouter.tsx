import { Route, Routes } from "react-router-dom"
import ListPage from "./pages/ListPage"

export enum ListsRoutes {
    ITEM = '/:listId'
}

export default function ListsRouter() {
    return (
        <Routes>
            <Route path={ListsRoutes.ITEM} element={<ListPage />} />
        </Routes>
    )
}