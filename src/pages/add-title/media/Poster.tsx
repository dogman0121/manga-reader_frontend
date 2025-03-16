import {Box, BoxProps} from "@mui/material";

function Poster({ onClick, url }: BoxProps & {url: string}) {
    return (
        <Box
            sx={{
                width: "140px"
            }}
            onClick={onClick}
        >
            <img 
                src={url}
                style={{
                    aspectRatio: "0.7",
                    width: "100%",
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

export default Poster;