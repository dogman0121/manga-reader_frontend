import { Box } from "@mui/material"
import {CSS} from '@dnd-kit/utilities';
import {
    useSortable,
} from "@dnd-kit/sortable";

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import FormFile from "../types/FormFile";


interface FormFilePreviewProps {
    width?: string,
    height?: string,
    aspectRatio?: string,
    onDelete?: () => void, 
    file:FormFile
}

export default function FormFilePreviewDraggable({
    width,
    height,
    aspectRatio, 
    onDelete, 
    file 
} : FormFilePreviewProps) {
    if (!file?.uuid)
        return;

    const { 
        attributes, 
        listeners, 
        setNodeRef, 
        transform, 
        transition, 
        isDragging  
    } = useSortable({ id: file.uuid });
    
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
            <Box
                sx={{
                    aspectRatio: aspectRatio,
                    width: width,
                    height: height,
                    borderRadius: "3% / 2%",
                    backgroundImage: `url(${file.src})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPositionY: "center",
                    backgroundSize: "100% auto",
                }}
            ></Box>
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
                        borderRadius: "50%",
                        touchAction: "none"
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


export function FormFilePreview({
    width,
    height,
    aspectRatio, 
    onDelete, 
    file, 
} : FormFilePreviewProps) {
    if (!file?.uuid)
        return;


    return (
        <Box 
            sx={{
                position: "relative",
            }}
        >
            <Box
                sx={{
                    aspectRatio: aspectRatio,
                    width: width,
                    height: height,
                    borderRadius: "3% / 2%",
                    backgroundImage: `url(${file.src})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPositionY: "center",
                    backgroundSize: "100% auto",
                }}
            ></Box>
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
                {onDelete && (
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
                )}
            </Box>
        </Box>
    );
}
