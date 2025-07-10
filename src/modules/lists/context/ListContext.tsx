import { createContext } from "react";
import List from "../types/List";

interface ListContextProps {
    list: List | null,
    setList: Function
}

const ListContext = createContext<ListContextProps>({list: null, setList: () => {}});

export default ListContext;