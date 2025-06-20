import { Box, Typography } from "@mui/material";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useEffect } from "react";
import FormFile from "../types/FormFile";
import { v4 as uuid4 } from 'uuid';

interface FormFileInput {
    width?: string | number,
    height?: string | number,
    aspectRatio?: string,
    value?: FormFile[],
    form?: "circle" | "square" | "rectangle",
    onChange?: Function,
    dropzoneOptions?: DropzoneOptions
}

export default function FormFileInput({
    width,
    height,
    aspectRatio,
    form,
    onChange,
    dropzoneOptions
}: FormFileInput) {

    const {getRootProps, getInputProps, acceptedFiles} = useDropzone({
        ...dropzoneOptions
    });

    useEffect(() => {
        const files = acceptedFiles.map((file: File) => {
            const uuid = uuid4().toString();
            return {
                    uuid: uuid, 
                    fileName: file.name, 
                    file: file, 
                    src: URL.createObjectURL(file)
                } as FormFile
        });

        onChange?.(files);
    }, [acceptedFiles])

    return (
        <Box {...getRootProps()}
        >
            <Box
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
                    <UploadFileIcon sx={{width: "27px", height: "27px"}}/>
                    {form != "circle" && (
                        <><Box
                            sx={{
                                textAlign: "center",
                                fontSize: "14px",
                                mt: "5px",
                                lineHeight: 1.2
                            }}
                        >
                            Добавить файл
                        </Box>
                        <Typography variant="subtitle1" fontSize={"14px"}>
                            (.zip, .rar, .png. jpg)
                        </Typography></>
                    )}
                </Box>
            </Box>
            <input type="file" {...getInputProps()}/>
        </Box>
    )
}