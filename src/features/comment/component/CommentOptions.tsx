import { Tooltip, Box, Typography } from "@mui/material";
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import { SyntheticEvent, useContext } from "react";
import CommentContext from "../context/CommentContext";
import ReplyIcon from '@mui/icons-material/Reply';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import IconButton from '@mui/material/IconButton';



function CommentOptions(
    {
        onAnswersListClick, 
        onInputButtonClick
    }: 
    {
        onAnswersListClick: React.EventHandler<SyntheticEvent>, 
        onInputButtonClick: React.EventHandler<SyntheticEvent>
    }) {
    const { answers_count } = useContext(CommentContext);

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
                <ArrowBackIosNewRoundedIcon 
                    sx={{
                        rotate: "90deg",
                        width: "16px",
                        height: "16px"
                    }} 
                />
                <Typography>0</Typography>
                <ArrowBackIosNewRoundedIcon 
                    sx={{
                        rotate: "270deg",
                        width: "18px",
                        height: "18px"
                    }}
                />
            </Box>
            {answers_count !== 0 && (
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
                    <Typography>{answers_count}</Typography>
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