import {Box, BoxProps} from "@mui/material";
import Poster from "../types/Poster";
import { storageService } from "../../../services/api/storageService";


function PosterImage({ onClick, poster }: BoxProps & {poster: Poster}) {
    return (
        <Box
            sx={{
                width: "140px",
                height: "210px"
            }}
            onClick={onClick}
        >
            <img 
                src={
                    poster.file ? 
                    poster.fileUrl || URL.createObjectURL(poster.file) 
                    : 
                    storageService.getUrl(`manga/${poster.fileName}`)
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