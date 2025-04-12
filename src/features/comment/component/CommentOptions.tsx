import { Tooltip, Box, Typography } from "@mui/material";
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import { SyntheticEvent, useContext } from "react";
import CommentContext from "../context/CommentContext";
import ReplyIcon from '@mui/icons-material/Reply';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import IconButton from '@mui/material/IconButton';
import { commentService } from "../service/api/commentService";



function CommentOptions(
    {
        onAnswersListClick, 
        onInputButtonClick
    }: 
    {
        onAnswersListClick: React.EventHandler<SyntheticEvent>, 
        onInputButtonClick: React.EventHandler<SyntheticEvent>
    }) {

    const { comment, setComment } = useContext(CommentContext);

    const handleVote = async (voteType: number) => {
        const { error } = await commentService.sendVote(comment.id, voteType);
        
        if (!error) {
            if (comment.user_vote == null)
                return setComment((prev: Comment) => (
                    {
                        ...prev, 
                        user_vote: voteType, 
                        up_votes: voteType == 0 ? comment.up_votes + 1 : comment.up_votes,
                        down_votes: voteType == 1 ? comment.down_votes + 1 : comment.down_votes
                    }
                ));
            
            if (comment.user_vote == voteType){
                return setComment((prev: Comment) => (
                    {
                        ...prev, 
                        user_vote: null, 
                        up_votes: voteType == 0 ? comment.up_votes - 1 : comment.up_votes,
                        down_votes: voteType == 1 ? comment.down_votes - 1 : comment.down_votes
                    }
                ));
            }
            else {
                if (voteType == 0) {
                    return setComment((prev: Comment) => (
                        {
                            ...prev, 
                            user_vote: voteType, 
                            up_votes: comment.up_votes + 1,
                            down_votes: comment.down_votes - 1
                        }
                    ));
                }
                else {
                    return setComment((prev: Comment) => (
                        {
                            ...prev, 
                            user_vote: voteType, 
                            up_votes: comment.up_votes - 1,
                            down_votes: comment.down_votes + 1
                        }
                    ));
                }
            }
        }
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                columnGap: "25px"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: "7px"
                }}
            >
                <Box
                    sx={{
                        p: "5px",
                        lineHeight: "0",
                        borderRadius: "50%",
                        background: comment.user_vote == 0 ? "var(--widget1-color)" : undefined
                    }}
                    onClick={
                        () => {handleVote(0)}
                    }
                >
                    <ArrowBackIosNewRoundedIcon 
                        sx={{
                            rotate: "90deg",
                            width: "16px",
                            height: "16px"
                        }} 
                    />
                </Box>
                <Typography>{comment.up_votes - comment.down_votes}</Typography>
                <Box
                    sx={{
                        p: "5px",
                        lineHeight: "0",
                        borderRadius: "50%",
                        background: comment.user_vote == 1 ? "var(--widget1-color)" : undefined
                    }}
                    onClick={
                        () => {handleVote(1)}
                    }
                >
                    <ArrowBackIosNewRoundedIcon 
                        sx={{
                            rotate: "270deg",
                            width: "16px",
                            height: "16px"
                        }}
                    />
                </Box>
                
            </Box>
            {comment.answers_count !== 0 && (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "5px"
                    }}
                    onClick={onAnswersListClick}
                >
                    <MessageRoundedIcon 
                        sx={{
                            width: "16px",
                            height: "16px"
                        }}
                    />
                    <Typography>{comment.answers_count}</Typography>
                </Box>
            )}
            <Typography
                onClick={onInputButtonClick}
                sx={{
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Tooltip title="ответить">
                    <IconButton
                        sx={{
                            padding: "4px"
                        }}
                    >
                        <Typography lineHeight={1}>
                            <ReplyIcon 
                                sx={{
                                    width: "20px",
                                    height: "20px",
                                }}
                            />
                        </Typography>
                    </IconButton>
                </Tooltip>
            </Typography>
        </Box>
    )
}

export default CommentOptions;