import { createContext } from "react";
import Comment, { EMPTY_COMMENT } from "../../../types/Comment";


const CommentContext = createContext<Comment>(EMPTY_COMMENT)

export default CommentContext;