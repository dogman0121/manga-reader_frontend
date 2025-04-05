import { Box } from "@mui/material";
import CommentInput from "../../../features/comment/component/CommentInput";
import { useContext, useEffect } from "react";
import TitleContext from "../../../context/TitleContext";



function Comments() {
    const {id} = useContext(TitleContext);

    useEffect(()=>{
        return () => {};
    }, [])

    const onSend = (text: string) => {

    }

    return (
        <Box>
            <CommentInput open={true} onSend={onSend}/>
        </Box>
    )
}

export default Comments;