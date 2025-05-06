import { Box, Typography } from "@mui/material"
import FormField from "./FormField"
import { useEffect, useState } from "react";
import FormFileInput from "./FormFileInput";
import { useDropzone } from "react-dropzone";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import FormFilePreviewDraggable from "./FormFilePreview";
import { v4 as uuid4 } from 'uuid';


import { useDeviceDetect, DEVICE } from "../../hooks/useDeviceDetect";
import { 
    closestCenter, 
    DragEndEvent, 
    PointerSensor, 
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import FormFile from "./types/File";

interface FormMultipleInput {
    title?: string,
    onInput?: Function
}

function FilesList({files, onChange}: {files: Array<FormFile>, onChange: Function}) {
    const pointerSencor = useSensor(PointerSensor);
    const touchSensor = useSensor(
        TouchSensor, { 
            activationConstraint: { delay: 250, tolerance: 5 },
        });

    const sensors = useSensors(pointerSencor, touchSensor);

    const device = useDeviceDetect();

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
                {files.map(file => <FormFilePreviewDraggable key={file.uuid} onDelete={() => {handleDelete(file.uuid)}} file={file}/>)}
            </SortableContext>
        </DndContext>
    )
}

export default function FormMultipleFilesInput({onInput, title}: FormMultipleInput) {
    const [files, setFiles] = useState<Array<FormFile>>([]);

    const {getRootProps, getInputProps, acceptedFiles} = useDropzone();

    useEffect(() => {        
        setFiles(prev => {
            const newArr: Array<FormFile> = Array.from(prev);

            acceptedFiles.forEach((file: File) => {
                if (!newArr.find((f) => f.fileName == file.name)){
                    const uuid = uuid4().toString();
                    newArr.push(
                        {
                            uuid: uuid, 
                            fileName: file.name, 
                            file: file, 
                            src: URL.createObjectURL(file)
                        } as FormFile)
                }
            });

            return newArr;
        })
    }, [acceptedFiles]);

    useEffect(() => {
        (onInput && files.length) ? onInput(files) : null
    }, [files]);

    const handleChange = (files: Array<FormFile>) => {
        setFiles(() => {return files});
    }

    return (
        <Box>
            {title && (
                <Typography>{title}</Typography>
            )}
            <FormField>
                <Box
                    sx={{
                        display: "grid",
                        columnGap: "10px",
                        rowGap: "8px",
                        gridTemplateColumns: "repeat(auto-fill, 150px)"
                    }}
                >
                    <FilesList onChange={handleChange} files={Array.from(files)} />
                    <FormFileInput 
                        width="100%"
                        aspectRatio="2/3"
                        form="rectangle"
                        inputProps={getInputProps()} 
                        rootProps={getRootProps()}
                    />
                </Box>
            </FormField>
        </Box>
    )
}