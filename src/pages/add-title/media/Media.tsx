import { useDropzone } from "react-dropzone";
import { Box, Modal, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {CSS} from '@dnd-kit/utilities';
import { SyntheticEvent, useEffect, useState } from "react"
import {
    useSortable,
    SortableContext,
} from "@dnd-kit/sortable";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useFormContext } from "react-hook-form";
import Poster from "./Poster";


function DraggablePreviewPoster({ onDelete, file } : {onDelete: React.EventHandler<SyntheticEvent>, file: File}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging  } =
    useSortable({ id: file.name });
    
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
            <Poster url={URL.createObjectURL(file)} />
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

function PreviewPoster({ onDelete, file } : {onDelete: React.EventHandler<SyntheticEvent>, file: File}) {
    return (
        <Box 
            sx={{
                maxWidth: "140px",
                position: "relative",
            }}
        >
            <Poster url={URL.createObjectURL(file)}/>
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

function PreviewWrapper({ onDelete, file } : {onDelete: React.EventHandler<SyntheticEvent>, file: File}) {
    return (
        <Box 
            sx={{
                position: "relative",
            }}
        >
            <img 
                src={URL.createObjectURL(file)} 
                style={{
                    maxHeight: "200px",
                    borderRadius: "8px"
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

function Field({children}: {children: React.ReactNode}) {
    return (
        <Box
            sx={{
                border: "1px solid #D9D9D9",
                p: "20px 25px",
                borderRadius: "12px",
                mt: "8px"
            }}
        >
            {children}
        </Box>
    )
}

function MainPoster() {
    const theme = useTheme();

    const { setValue, watch } = useFormContext();

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Box>
            <Box>Основной постер</Box>
            <Field>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "10px"
                    }}
                >
                    <Box 
                        sx={{
                            aspectRatio: "0.7",
                            width: "140px",
                            height: "100%",
                            p: "20px 10px",
                            border: "2px dashed #D9D9D9",
                            borderRadius: "12px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        onClick={
                            () => {
                                setModalVisible(true);
                            }
                        }
                    >
                        <Typography 
                            variant="subtitle1"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}    
                        >
                            <Box 
                                sx={{
                                    textAlign: "center", 
                                    fontSize:"15px", 
                                    mt: "5px", 
                                    lineHeight: 1.2
                                }}
                            >
                                Выберите<br/>изображение
                            </Box>
                        </Typography>
                    </Box>
                    {watch("mainPoster") && <PreviewPoster file={watch("mainPoster")} onDelete={() => {setValue("mainPoster", undefined)}}/>}
                </Box>
            </Field>
            <Modal
                open={modalVisible}
                onClose={() => {setModalVisible(false)}}
            >
                <Box
                    sx={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        p: "20px 15px",
                        borderRadius: "12px",
                        bgcolor: theme.palette.customBackgrounds?.widget1
                    }}
                >
                {watch("posters")?.length ?
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                            columnGap: "10px",
                            rowGap: "15px"
                        }}
                    >
                        {watch("posters").map((poster: File, ind: number) =>
                            <Poster 
                                key={ind} 
                                url={URL.createObjectURL(poster)}
                                onClick={() => {
                                    setValue("mainPoster", poster);
                                }}
                            />)}
                    </Box>
                :
                    <>
                        Ни одного изображения
                    </>
                }
                </Box>
            </Modal>
        </Box>
    )
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
                    <BlockInput name="wrapper"/>
                    {watch("wrapper") && (<PreviewWrapper onDelete={() => {setValue("wrapper", undefined)}} key={watch("wrapper").name} file={watch("wrapper")}/>)}
                </Box>
            </Field>
        </Box>
    )
}

function BlockInput({ name } : { name: string }){
    const { acceptedFiles, getRootProps, getInputProps} = useDropzone({

    });
    const {setValue} = useFormContext();

    useEffect(() => {
        if (acceptedFiles.length !== 0)
            setValue(name, acceptedFiles[0]);

        return () => {}
    }, [acceptedFiles])

    return (
        <Box 
            {...getRootProps()}
            sx={{
                aspectRatio: "0.7",
                width: "140px",
                height: "100%",
                p: "20px 10px",
                border: "2px dashed #D9D9D9",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <input {...getInputProps()}/>
            <Typography 
                variant="subtitle1"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}    
            >
                <UploadFileIcon fontSize="medium"/>
                <Box 
                    sx={{
                        textAlign: "center", 
                        fontSize:"15px", 
                        mt: "5px", 
                        lineHeight: 1.2
                    }}
                >
                    Добавить<br/>файл
                </Box>
            </Typography>
            
        </Box>
    )
}

function BlockInputMultiple({ name } : { name: string }) {
    const { acceptedFiles, getRootProps, getInputProps} = useDropzone({

    });

    const {watch, setValue} = useFormContext();

    useEffect(() => {
        const newArray: Array<File> = Array.from(watch(name) || []);
        acceptedFiles.forEach(file => {
            let flag: boolean = false;
            newArray.forEach(ffile => (flag = flag || file.name === ffile.name))

            if (!flag)
                newArray.push(file);
        })

        setValue("posters", newArray);
    }, [acceptedFiles])

    return (
        <Box 
            {...getRootProps()}
            sx={{
                aspectRatio: "0.7",
                width: "140px",
                height: "100%",
                p: "20px 10px",
                border: "2px dashed #D9D9D9",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <input {...getInputProps()}/>
            <Typography 
                variant="subtitle1"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}    
            >
                <UploadFileIcon fontSize="medium"/>
                <Box 
                    sx={{
                        textAlign: "center", 
                        fontSize:"15px", 
                        mt: "5px", 
                        lineHeight: 1.2
                    }}
                >
                    Добавить<br/>файлы
                </Box>
            </Typography>
            
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

    const handleDelete = (file: File) => {
        if (file === watch("mainPoster"))
            setValue("mainPoster", undefined);
        setValue("posters", ((prev:Array<File>) => prev.filter(ffile => (ffile != file)))(watch("posters")))
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
                        <BlockInputMultiple name="posters"/>
                        <SortableContext items={watch("posters")?.map((file:File) => Object({id: file.name, file: file})) || []}>
                            { watch("posters")?.map((file: File) => (
                                <DraggablePreviewPoster 
                                    key={file.name} 
                                    file={file} 
                                    onDelete={() => {
                                        handleDelete(file)
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