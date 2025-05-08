import { Box } from "@mui/material";

function Poster({src, width}: {src: string, width?: string}){
    return (
        <Box
            sx={{
                width: width || "100%",
                borderRadius: "3% / 2%",
            }}
        >
            <img
                src={src}
                style={{
                    aspectRatio: "2/3",
                    width: "100%",
                    height: "100%"
                }} 
            />
        </Box>
    )
}

export default Poster;