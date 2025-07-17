import { Box, Typography, useTheme } from "@mui/material"
import FormField from "./FormField"
import { useEffect, useState } from "react";
import FormFileInput from "./FormFileInput";
import { DropzoneOptions } from "react-dropzone";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import FormFilePreviewDraggable from "./FormFilePreview";
import { v4 as uuid4} from "uuid";
import "jszip";


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
import JSZip from "jszip";

interface FormMultipleInput {
    title?: string,
    onChange?: Function
    defaultValue?: Array<FormFile>,
    dropzoneOptions?: DropzoneOptions
    showFilenames?: boolean,
    unpackZip?: boolean
}

function FilesList({
    files, 
    onChange, 
    showFilenames
}: {
    files: Array<FormFile>, 
    onChange: Function, 
    showFilenames?: boolean}) {
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
                            file={file}
                            showFilename={showFilenames}
                        />
                    ))}
            </SortableContext>
        </DndContext>
    )
}

async function getZipFiles(zipFile: File){
    const {files} = await JSZip().loadAsync(zipFile);

    const unpackedFiles: FormFile[] = [];

    for (let f of Object.values(files)) {
        const fileName = f.name.substring(0, f.name.lastIndexOf("."))
        const file = new File([await f.async("blob")], fileName, {type: "image/webp"}); 
        unpackedFiles.push({
            uuid: uuid4(),
            file: file,
            fileName: f.name,
            src: URL.createObjectURL(file)
        })
    }

    return unpackedFiles;
}

export default function FormMultipleFilesInput({
    onChange, 
    title, 
    defaultValue,
    dropzoneOptions,
    showFilenames,
    unpackZip
}: FormMultipleInput) {
    const [files, setFiles] = useState<Array<FormFile>>(defaultValue || []);

    const theme = useTheme()

    const handleChange = async (files: FormFile[]) => {
        const newFiles: FormFile[] = [];

        for (let f of files) {
            switch(f.file?.type) {
                case "application/x-zip-compressed":
                    if (unpackZip){
                        const unpackedFiles = await getZipFiles(f.file);
                        newFiles.push(...unpackedFiles);
                        break;
                    }
                    else {
                        newFiles.push(f)
                        break;
                    }

                default:
                    newFiles.push(f)

            }
        }
        
        setFiles(prev => prev.concat(newFiles))
    }

    const handleChangeOrder = (files: FormFile[]) => {
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
                    <FilesList onChange={handleChangeOrder} files={Array.from(files)} showFilenames={showFilenames}/>
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