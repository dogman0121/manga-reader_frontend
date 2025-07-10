import { useContext } from "react";
import TitleContext from "../context/TitleContext";

export default function useTitle() {
    const { title, setTitle } = useContext(TitleContext)
    return { title, setTitle };
}