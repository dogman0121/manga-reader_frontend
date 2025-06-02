import { Box } from "@mui/material";

function Poster({src, width}: {src: string, width?: string}){
    return (
        <Box
            sx={{
                width: width || "100%",
            }}
        >
            <img
                src={src}
                style={{
                    aspectRatio: "2/3",
                    borderRadius: "3% / 2%",
                    width: "100%",
                }} 
            />
        </Box>
    )
}

export default Poster;