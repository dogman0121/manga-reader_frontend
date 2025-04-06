import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Comment, { EMPTY_COMMENT } from "../../types/Comment";
import { commentService } from "../../features/comment/service/api/commentService";
import CommentBlock from "../../features/comment/component/CommentBlock";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles"
import SkeletonCommentBlock from "../../features/comment/component/SkeletonCommentBlock";
import { AppContent } from "../../layouts/app-layout/AppLayout";


export default function CommentPage() {
    const { id } = useParams();

    const [comment, setComment] = useState<Comment>(EMPTY_COMMENT);
    const [isLoaing, setIsLoading] = useState(true);

    const theme = useTheme();

    useEffect(() => {
        commentService.fetchComment(parseInt(id || ""))
            .then((c: Comment) => {
                setComment(c);
                setIsLoading(false);
            })
    }, [])

    

    return (
        <AppContent>
            <Box
                sx={{
                    maxWidth: "700px",
                    m: "0 auto",
                    p: "15px 20px",
                    border: `1px solid ${theme.vars.palette.secondary.main}`,
                    borderRadius: "12px"
                }}
            >
                {isLoaing ?
                    <SkeletonCommentBlock />
                    :
                    <CommentBlock comment={comment} />
                }
            </Box>
        </AppContent>
    )
}