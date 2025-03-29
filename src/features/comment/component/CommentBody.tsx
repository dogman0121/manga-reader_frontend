import { Box, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { commentService } from "../service/api/commentService";
import { useContext } from "react";
import CommentContext from "../context/CommentContext";
import { Link } from "react-router-dom"

function CommentBody() {
    const {id, user, text, created_at} = useContext(CommentContext);

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",

                rowGap: "5px"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <Box>
                    <Link to={`/profile/${user.id}`}><Typography>{user.login}</Typography></Link>
                    <Link to={`/comment/${id}`}>
                        <Typography 
                            variant="subtitle1"
                            lineHeight={1.2}
                        >
                            {commentService.formatTimedelta(new Date().getTime() - new Date(created_at).getTime())} назад
                        </Typography>
                    </Link>
                </Box>
                <MoreVertIcon />
            </Box>
            <Box>
                {text}
            </Box>
        </Box>
    )
}

export default CommentBody;