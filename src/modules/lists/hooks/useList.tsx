import { useContext } from "react";
import ListContext from "../context/ListContext";

export default function useList() {
    const {list, setList} = useContext(ListContext);

    return {list, setList}
}