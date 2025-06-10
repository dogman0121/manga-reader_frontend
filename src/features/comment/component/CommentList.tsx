import { Box } from "@mui/material";
import Comment from "../../../types/Comment";
import CommentBlock from "./CommentBlock";

function CommentList({ comments }: {comments: Comment[]}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "4px"
            }}
        >
            {comments.map(comment => <CommentBlock key={comment.id} comment={comment}/>)}
        </Box>
    )
}

export default CommentList;