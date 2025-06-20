import { Box, Typography, useTheme } from "@mui/material"
import FormField from "./FormField"
import { useEffect, useState } from "react";
import FormFileInput from "./FormFileInput";
import { DropzoneOptions } from "react-dropzone";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import FormFilePreviewDraggable from "./FormFilePreview";


import { useDeviceDetect, DEVICE } from "../../../hooks/useDeviceDetect";
import { 
    closestCenter, 
    DragEndEvent, 
    PointerSensor, 
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import FormFile from "../types/FormFile";

interface FormMultipleInput {
    title?: string,
    onChange?: Function
    defaultValue?: Array<FormFile>,
    dropzoneOptions?: DropzoneOptions
}

function FilesList({files, onChange}: {files: Array<FormFile>, onChange: Function}) {
    const pointerSencor = useSensor(PointerSensor);
    const touchSensor = useSensor(
        TouchSensor, { 
            activationConstraint: { delay: 250, tolerance: 5 },
        });

    const sensors = useSensors(pointerSencor, touchSensor);

    const { device } = useDeviceDetect();

    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;
    
        const activeInd = active.data.current?.sortable.index;
        const overInd = over?.data.current?.sortable.index;

        const sign = activeInd > overInd ? -1 : 1;

        const newArr = Array.from(files);
        for(let i = activeInd; i != overInd; i += sign){
            const t = newArr[i];
            newArr[i] = newArr[i+sign];
            newArr[i+sign] = t;
        }

        onChange(newArr);
    }

    const handleDragStart = () => {
    }

    const handleDelete = (uuid: string) => {
        const newArr = files.filter((f) => f.uuid != uuid)
        onChange(newArr);
    }

    return (
        <DndContext
            autoScroll={{enabled: device !== DEVICE.MOBILE}}
            onDragEnd={handleDragEnd} 
            onDragStart={handleDragStart}
            collisionDetection={closestCenter} 
            sensors={sensors}
        >
            <SortableContext items={files.map(file => ({id: file.uuid}))}>
                    {files.map(file => (
                        <FormFilePreviewDraggable 
                            aspectRatio="2/3"
                            width="100%"
                            key={file.uuid} 
                            onDelete={() => {handleDelete(file.uuid)}} 
                            file={file}/>
                    ))}
            </SortableContext>
        </DndContext>
    )
}

export default function FormMultipleFilesInput({
    onChange, 
    title, 
    defaultValue,
    dropzoneOptions
}: FormMultipleInput) {
    const [files, setFiles] = useState<Array<FormFile>>(defaultValue || []);

    const theme = useTheme()

    const handleChange = (files: FormFile[]) => {
        setFiles(prev => prev.concat(files))
    }

    const handleChangeOrder = (files: Array<FormFile>) => {
        setFiles(files);
    }

    useEffect(() => {
        onChange?.(files || []) 
    }, [files]);

    return (
        <Box>
            {title && (
                <Typography>{title}</Typography>
            )}
            <FormField>
                <Box
                    sx={{
                        display: "grid",
                        columnGap: theme.spacing(2),
                        rowGap: theme.spacing(1),
                        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))"
                    }}
                >
                    <FilesList onChange={handleChangeOrder} files={Array.from(files)} />
                    <FormFileInput 
                        width="100%"
                        aspectRatio="2/3"
                        form="rectangle"
                        dropzoneOptions={dropzoneOptions}
                        onChange={handleChange}
                    />
                </Box>
            </FormField>
        </Box>
    )
}