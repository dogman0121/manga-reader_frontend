import { Box, useTheme } from "@mui/material";
import FormFile from "../types/FormFile";
import FileOpenRoundedIcon from '@mui/icons-material/FileOpenRounded';
import Modal from "../../modal/Modal";
import { useState } from "react";
import { FormFilePreview } from "./FormFilePreview";
import Notification from "../../../components/ui/Notification";

interface FormFileSelectProps {
    width?: string | number,
    height?: string | number,
    aspectRatio?: string,
    form?: "circle" | "square" | "rectangle",
    onChange?: Function,
    files: FormFile[],
    value: FormFile
}


export default function FormFileSelect({width, height, aspectRatio, form, files, onChange}: FormFileSelectProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [noficationOpened, setNotificationOpened] = useState(false);

    const theme = useTheme()

    return (
        <>
            <Box
                onClick={() => {files?.length ? setModalOpen(true) : setNotificationOpened(true)}}
                sx={{
                    width: width,
                    height: height,
                    aspectRatio: form != "rectangle" ? "1/1" : aspectRatio,
                    borderRadius: form == 'circle' ? "50%" : "8px", 
                    border: "thin dashed var(--subtitle1-text-color)",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height:"100%",
                        color: "var(--subtitle1-text-color)"
                    }}
                >
                    <FileOpenRoundedIcon sx={{width: "27px", height: "27px"}}/>
                    {form != "circle" && (
                        <Box
                            sx={{
                                textAlign: "center",
                                fontSize: "14px",
                                mt: "5px",
                                lineHeight: 1.2
                            }}
                        >
                            Выберите файл
                        </Box>
                    )}
                </Box>
            </Box>
            <Modal
                open={modalOpen}
                onClose={() => {setModalOpen(false)}}
            >
                <Box
                    sx={{
                        bgcolor: theme.palette.background.paper,
                        p: theme.spacing(3),
                        borderRadius: "12px",
                        display: "flex",
                        flexDirection: "row",
                        gap: theme.spacing(3),
                        maxWidth: "500px",
                    }}
                >
                    {files?.map(file => (
                        <Box
                            key={file.uuid}
                            onClick={() => {setModalOpen(false); onChange?.(file)}}
                        >
                            <FormFilePreview
                                file={file}
                                width="200px"
                                aspectRatio="2/3"
                            />
                        </Box>
                    ))}
                </Box>
            </Modal>
            <Notification 
                open={noficationOpened}
                onClose={() => {setNotificationOpened(false)}}
                variant="error"
                message="Вы еще не добавили ни одного файла"
            />
        </>
        
    )
}