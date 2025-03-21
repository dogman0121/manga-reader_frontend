import PosterImage from "./PosterImage";
import Poster from "../types/Poster";
import { SyntheticEvent } from "react";
import { Box } from "@mui/material";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


function PreviewPoster({ onDelete, poster } : {onDelete: React.EventHandler<SyntheticEvent>, poster: Poster}) {
    return (
        <Box 
            sx={{
                maxWidth: "140px",
                position: "relative",
            }}
        >
            <PosterImage poster={poster}/>
            <Box
                sx={{
                    position: "absolute",
                    right: "5px",
                    top: "5px",
                }}
            >
                <CloseRoundedIcon
                    onClick={onDelete}
                    sx={{
                        width: "20px",
                        height: "20px",
                        bgcolor: "secondary.main",
                        p: "2px",
                        borderRadius: "50%"
                    }}
                />
            </Box>
        </Box>
    );
}

export default PreviewPoster;