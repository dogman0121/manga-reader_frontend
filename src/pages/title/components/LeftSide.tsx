import { useContext } from "react";
import TitleContext from "../../../context/TitleContext";
import SaveButton from "./SaveButton";
import Poster from "../../../components/ui/Poster";
import { Box } from "@mui/material";



function LeftSide() {
    const manga = useContext(TitleContext);

    return (
        <Box
            sx={{
                minWidth: "150px",
                maxWidth: "220px",
                width: "100%"
            }}
        >
            <Poster 
                src={manga.main_poster?.medium || ""}
            />
            <SaveButton/>
        </Box>
    )
}

export default LeftSide;