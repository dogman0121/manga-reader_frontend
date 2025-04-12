import { useState } from "react";
import Comment from "../../../types/Comment";
import CommentContext from "../context/CommentContext";

function CommentProvider({ comment, children }: {comment: Comment, children: React.ReactNode}) {
    const [proxiComment, setProxiComment] = useState(comment);

    return (
        <CommentContext.Provider
            value={{comment: proxiComment, setComment: setProxiComment}}
        >
            {children}
        </CommentContext.Provider>
    )
}

export default CommentProvider;