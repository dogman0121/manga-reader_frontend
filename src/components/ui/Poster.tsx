import { Box } from "@mui/material";

function Poster({
    src, 
    width,
    style
}: {
    src: string, 
    width?: string
    style?: React.CSSProperties
}){
    return (
        <Box
            sx={{
                maxWidth: width || "100%",
            }}
        >
            <img
                draggable={false}
                src={src}
                style={{
                    aspectRatio: "2/3",
                    borderRadius: "3% / 2%",
                    width: "100%",
                    ...style
                }} 
            />
        </Box>
    )
}

export default Poster;