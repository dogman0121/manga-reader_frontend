import { useContext } from "react";
import TitleContext from "../context/TitleContext";

export default function useTitle() {
    const { title } = useContext(TitleContext)
    return { title };
}