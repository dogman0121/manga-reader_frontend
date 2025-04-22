import {Box, BoxProps} from "@mui/material";
import Poster from "../types/Poster";


function PosterImage({ onClick, poster }: BoxProps & {poster: Poster}) {
    return (
        <Box
            sx={{
                aspectRatio: "2/3",
                width: "120px",
            }}
            onClick={onClick}
        >
            <img 
                src={
                    poster.fileUrl ? 
                    poster.fileUrl
                    :
                    poster.file ?
                    URL.createObjectURL(poster.file)
                    :
                    ""  
                }
                style={{
                    aspectRatio: "2/3",
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px"
                }}
                onDragOver={(event) => {
                    event.preventDefault(); event.dataTransfer.dropEffect = "none"
                }}
                onDrop={(event) => {event.preventDefault()}}
            />
        </Box>
    )
}

export default PosterImage;