import Comment from "../../../types/Comment";
import CommentContext from "../context/CommentContext";

function CommentProvider({ comment, children }: {comment: Comment, children: React.ReactNode}) {
    return (
        <CommentContext.Provider
            value={comment}
        >
            {children}
        </CommentContext.Provider>
    )
}

export default CommentProvider;