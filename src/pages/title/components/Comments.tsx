import { Box, CircularProgress } from "@mui/material";
import CommentInput from "../../../features/comment/component/CommentInput";
import { useContext, useEffect, useState } from "react";
import TitleContext from "../../../context/TitleContext";
import { commentService } from "../../../features/comment/service/api/commentService";
import CommentList from "../../../features/comment/component/CommentList";
import Comment from "../../../types/Comment";
import InfiniteScroll from "react-infinite-scroll-component";



function Comments() {
    const {id} = useContext(TitleContext);

    const [comments, setComments] = useState<Array<Comment>>([]);

    const [hasMore, setHasMore] = useState(true);

    const [page, setPage] = useState(1);

    const onSend = async(text: string) => {
        const comment = await commentService.sendTitleComment(id, text);
        
        setComments((prev) => {const newAr = Array.from(prev);newAr.unshift(comment); return newAr});
    }

    useEffect(() => {
        commentService.fetchTitleComments(id, page)
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
            <InfiniteScroll 
                dataLength={8}
                hasMore={hasMore}
                next={() =>{
                    setPage((page) => page+1)
                }}
                loader={<Box sx={{display: "flex", justifyContent: "center"}}><CircularProgress /></Box>}
                style={{overflow: "none"}}
            >
                <CommentList comments={comments}/>
            </InfiniteScroll>
            
        </Box>
    )
}

export default Comments;