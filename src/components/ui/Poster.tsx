import { Box } from "@mui/material";

function Poster({src, width}: {src: string, width?: string}){
    return (
        <Box
            sx={{
                aspectRatio: "2/3",
                width: width || "100%",
                borderRadius: "3% / 2%",
                backgroundImage: `url(${src})`,
                backgroundRepeat: "no-repeat",
                backgroundPositionY: "center",
                backgroundSize: "100% auto",
            }}
        ></Box>
    )
}

export default Poster;