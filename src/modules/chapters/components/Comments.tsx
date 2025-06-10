import { Box, useTheme } from "@mui/material";
import CommentInput from "../../../features/comment/component/CommentInput";
import CommentList from "../../../features/comment/component/CommentList";
import DynamicScroll from "../../../components/DynamicScroll";
import { useEffect, useState } from "react";
import useChapter from "../hooks/useChapter";
import { commentService } from "../../../features/comment/service/api/commentService";
import Comment from "../../../types/Comment";

export default function Comments() {
    const { chapter } = useChapter();
    
    const [comments, setComments] = useState<Comment[]>([]);

    const theme = useTheme();

    const [page, setPage] = useState(1);

    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (chapter == null)
            return;

        commentService.fetchChapterComments(chapter.id, page)
            .then(({data, error}) => {
                if (error == null && data != null)
                    setComments((comments) => comments.concat(data));
                    if (data.length < 8)
                        setHasMore(false);
            })
    }, [chapter, page])

    
    if (chapter == null)
        return null;


    const onSend = async(text: string) => {
        const { data:comment }: {data: Comment} = await commentService.sendChapterComment(chapter.id, text);
        
        setComments((prev) => {const newAr: Comment[] = Array.from(prev);newAr.unshift(comment); return newAr});
    }

    return (
        <Box
            sx={{
            }}
        >
            <Box 
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: theme.spacing(3)
                }}
            >
                <CommentInput open={true} onSend={onSend}/>
                <DynamicScroll
                    hasMore={hasMore}
                    dataLength={8}
                    next={() => {setPage((page) => page+1)}}
                >
                    <CommentList comments={comments}/>
                </DynamicScroll>
            </Box>
        </Box>
    )
}