import { Box, Typography } from "@mui/material";
import { useState, useEffect, useContext, useRef } from "react";
import { commentService } from "../service/api/commentService";
import CommentContext from "../context/CommentContext";
import Comment from "../../../types/Comment";
import SubdirectoryArrowRightRoundedIcon from '@mui/icons-material/SubdirectoryArrowRightRounded';
import CommentList from "./CommentList";

function CommentAnswers({ open }: {open: Boolean}) {
    const { id, answers_count } = useContext(CommentContext);
    
    const [isLoading, setIsLoading] = useState(false);

    const [page, setPage] = useState<number>(1);

    const [answers, setAnswers] = useState<Array<Comment>>([]);

    const lastPage = useRef<number>(0);

    useEffect(() => {
        if (open && lastPage.current !== page) {
            setIsLoading(true);
            commentService.fetchAnswers(id, page)
                .then(({data}) => {
                    setAnswers((prev) => [...prev, ...data] as Comment[])
                    lastPage.current = page;
                    setIsLoading(false);
                })
        }
    }, [open, page]);

    return (
        <>
            {open && (
                <>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "4px"
                        }}
                    >
                        <CommentList comments={answers} />
                        {answers.length < answers_count && !isLoading && (
                            <Box
                                sx={{
                                    mt: "5px",
                                    p: "10px",
                                    display: "flex",
                                    flexDirection: "row",
                                    columnGap: "5px",
                                    alignItems: "center",
                                    cursor: "pointer"
                                }}
                                onClick={() => {setPage(page => ++page)}}
                            >
                                <SubdirectoryArrowRightRoundedIcon 
                                    sx={{
                                        width: "20px",
                                        height: "20px"
                                    }}
                                />
                                <Typography>Показать еще</Typography>
                            </Box>
                        )}
                    </Box>
                </>
            )}
        </>
    )
}

export default CommentAnswers;