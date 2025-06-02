import { Box } from "@mui/material";
import CommentInput from "../../../features/comment/component/CommentInput";
import { useContext, useEffect, useState } from "react";
import TitleContext from "../../../context/TitleContext";
import { commentService } from "../../../features/comment/service/api/commentService";
import CommentList from "../../../features/comment/component/CommentList";
import Comment from "../../../types/Comment";
import DynamicScroll from "../../../components/DynamicScroll";



function Comments() {
    const { title } = useContext(TitleContext);

    const [comments, setComments] = useState<Array<Comment>>([]);

    const [hasMore, setHasMore] = useState(true);

    const [page, setPage] = useState(1);

    const onSend = async(text: string) => {
        const comment = await commentService.sendTitleComment(title.id, text);
        
        setComments((prev) => {const newAr = Array.from(prev);newAr.unshift(comment); return newAr});
    }

    useEffect(() => {
        commentService.fetchTitleComments(title.id, page)
            .then(({data}) => {
                if (data.length < 8)
                    setHasMore(false);

                setComments((prev) => [...prev, ...data])
            })
    }, [page])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "15px"
            }}
        >
            <CommentInput open={true} onSend={onSend}/>
            <DynamicScroll
                dataLength={comments.length}
                hasMore={hasMore}
                next={() =>{
                    setPage((page) => page+1)
                }}
            >
                <CommentList comments={comments}/>
            </DynamicScroll>
            
        </Box>
    )
}

export default Comments;