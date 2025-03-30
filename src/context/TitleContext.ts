import { createContext } from "react";
import Title from "../types/Title";
import { EMPTY_TITLE } from "../types/Title";

const TitleContext = createContext<Title>(EMPTY_TITLE);


export default TitleContext;