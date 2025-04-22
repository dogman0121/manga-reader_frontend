import { Box } from "@mui/material"
import { SyntheticEvent } from "react"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useFormContext } from "react-hook-form";
import Field from "./Field";
import MainPoster from "./MainPoster";
import BlockInput from "./file-input/BlockInput";
import Poster from "../types/Poster";
import DraggableList from "./DraggableList";


function PreviewWrapper({ onDelete, poster } : {onDelete: React.EventHandler<SyntheticEvent>, poster: Poster}) {
    return (
        <Box 
            sx={{
                position: "relative",
                maxHeight: "180px",
                maxWidth: "100%"
            }}
        >
            <img 
                src={poster.file ? poster.fileUrl || URL.createObjectURL(poster.file) : poster.fileName} 
                style={{
                    borderRadius: "8px",
                    maxHeight: "210px",
                    maxWidth: "auto"
                }}
                onDragOver={(event) => {event.preventDefault(); event.dataTransfer.dropEffect = "none"}}
                onDrop={(event) => {event.preventDefault()}}
            />
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




function Wrapper() {
    const { setValue, watch } = useFormContext();

    return (
        <Box>
            <Box>Обложка</Box>
            <Field>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "10px"
                    }}
                >
                    <BlockInput onAcceptFile={(file: File) => {setValue("background", {fileName: file, file: file, fileUrl: URL.createObjectURL(file)})}}/>
                    {watch("background") && (<PreviewWrapper onDelete={() => {setValue("background", undefined)}} key={watch("background").fileName} poster={watch("background")}/>)}
                </Box>
            </Field>
        </Box>
    )
}


function Media() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "25px"
            }}
        >
            <MainPoster />
            <Wrapper />
            <DraggableList />
        </Box>
    )
}

export default Media;