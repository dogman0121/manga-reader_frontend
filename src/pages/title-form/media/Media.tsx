import { Box, Typography } from "@mui/material"
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';
import { SyntheticEvent } from "react"
import {
    useSortable,
    SortableContext,
} from "@dnd-kit/sortable";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import { useFormContext } from "react-hook-form";
import PosterImage from "./PosterImage";
import Field from "./Field";
import MainPoster from "./MainPoster";
import BlockInput from "./file-input/BlockInput";
import PosterBlockInputMultiple from "./file-input/PosterBlockInputMultiple";
import Poster from "../types/Poster";
import { storageService } from "../../../services/api/storageService";


function DraggablePreviewPoster({ onDelete, poster } : {onDelete: React.EventHandler<SyntheticEvent>, poster: Poster}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging  } =
    useSortable({ id: poster.fileName });
    
    const style = {
        transition,
        zIndex: isDragging ? 10 : 1,
        transform: CSS.Translate.toString(transform),
    };

    return (
        <Box 
            ref={setNodeRef} 
            {...attributes}
            style={style} 
            sx={{
                position: "relative",
            }}
        >
            <PosterImage poster={poster} />
            <Box
                sx={{
                    position: "absolute",
                    right: "5px",
                    top: "5px",
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "5px"
                }}
            >
                <DragIndicatorRoundedIcon 
                    {...listeners} 
                    sx={{
                        width: "20px",
                        height: "20px",
                        bgcolor: "secondary.main",
                        p: "2px",
                        borderRadius: "50%"
                    }}
                />
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



function PreviewWrapper({ onDelete, poster } : {onDelete: React.EventHandler<SyntheticEvent>, poster: Poster}) {
    return (
        <Box 
            sx={{
                position: "relative",
                maxHeight: "210px",
                maxWidth: "100%"
            }}
        >
            <img 
                src={poster.file ? poster.fileUrl || URL.createObjectURL(poster.file) : storageService.getUrl(`manga/${poster.fileName}`)} 
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
    console.log(watch("background"));

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

function Posters() {
    const {watch, setValue} = useFormContext();

    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;
    
        const activeInd = active.data.current?.sortable.index;
        const overInd = over?.data.current?.sortable.index;

        const sign = activeInd > overInd ? -1 : 1;

        setValue("posters", ((prev: Array<File>) => {
            const newArr = Array.from(prev);

            for(let i = activeInd; i != overInd; i += sign){
                const t = newArr[i];
                newArr[i] = newArr[i+sign];
                newArr[i+sign] = t;
            }

            return newArr;
        })(watch("posters")))
    }

    const handleDelete = (poster: Poster) => {
        if (poster === watch("mainPoster"))
            setValue("mainPoster", undefined);
        setValue("posters", ((prev:Array<Poster>) => prev.filter(pposter => (pposter != poster)))(watch("posters")))
    }

    return (
        <Box>
            <Typography>Постеры</Typography>
            <Field>
                <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                    <Box
                        sx={{
                            display: "grid",
                            columnGap: "10px",
                            rowGap: "8px",
                            gridTemplateColumns: "repeat(auto-fill, 140px)"
                        }}
                    >
                        <PosterBlockInputMultiple name="posters"/>
                        <SortableContext items={watch("posters")?.map((file:Poster) => Object({id: file.fileName})) || []}>
                            { watch("posters")?.map((poster: Poster) => (
                                <DraggablePreviewPoster 
                                    key={poster.fileName} 
                                    poster={poster} 
                                    onDelete={() => {
                                        handleDelete(poster)
                                    }}
                                />
                            ))}
                        </SortableContext>
                    </Box>
                </DndContext>
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
            <Posters />
        </Box>
    )
}

export default Media;