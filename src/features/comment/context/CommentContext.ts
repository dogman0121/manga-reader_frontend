import { createContext } from "react";
import Comment, { EMPTY_COMMENT } from "../../../types/Comment";

interface CommentContextProps {
    comment: Comment,
    setComment: Function
}

const CommentContext = createContext<CommentContextProps>({comment: EMPTY_COMMENT, setComment: () => {}})

export default CommentContext;