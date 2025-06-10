
import Comment from "../../../types/Comment";
import CommentProvider from "./CommentProvider";
import CommentBody from "./CommentBody";
import CommentAnswers from "./CommentAnswers";
import { useState } from "react";
import { Box, Avatar } from "@mui/material";
import CommentOptions from "./CommentOptions";
import CommentInput from "./CommentInput";
import { commentService } from "../service/api/commentService";

function CommentBlock({ comment }: {comment: Comment}) {
    //commentService.formatTimedelta(new Date().getTime() - new Date(comment.created_at).getTime())

    const [answersOpened, setAnswersOpened] = useState(false);

    const [inputOpened, setInputOpened] = useState(false);

    const onAnswerSend = (text: string) => {
        commentService.sendAnswer(comment.id, text)
            .then(({error}) => {
                if (!error){
                    setAnswersOpened(true);
                    comment.answers_count++;
                }
            })
    }

    return (
        <CommentProvider comment={comment}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "10px"
                }}
            >
                <Box minWidth={"40px"}>
                    <Avatar
                        src={comment.user?.avatar}
                        alt={comment.user.login}
                        sx={{width: "40px", height: "40px"}}
                    />
                </Box>
                <Box 
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "5px"
                    }}
                >
                    <CommentBody />
                    <CommentOptions 
                        onAnswersListClick={() => setAnswersOpened((prev) => !prev)}
                        onInputButtonClick={() => setInputOpened((prev) => !prev)}
                    />
                    <CommentInput open={inputOpened} onSend={onAnswerSend}/>
                    <CommentAnswers 
                        open={answersOpened}
                    />
                </Box>
            </Box>
            
        </CommentProvider>
    )
}

export default CommentBlock;