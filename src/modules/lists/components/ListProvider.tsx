import { Children } from "react";
import ListContext from "../context/ListContext";
import List from "../types/List";

export default function ListProvider({
    list, 
    setList, 
    children
}: {
    list: List | null, 
    setList: Function, 
    children?: React.ReactElement | React.ReactElement[]
}) {
    return (
        <ListContext.Provider value={{
            list: list,
            setList: setList
        }}>
            {Children.map(children, child => child)}
        </ListContext.Provider>
    )
}