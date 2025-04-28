import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material"
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface ImageInputProps {
    src?: string,
    alt?: string,
    width?: string | number,
    height?: string | number,
    aspectRatio?: string,
    form?: "circle" | "square" | "rectangle",
    onInput: Function
}

export default function ImageInput({
    src,
    alt,
    width,
    height,
    aspectRatio,
    form,
    onInput
}: ImageInputProps){
    const { acceptedFiles, getRootProps, getInputProps} = useDropzone({
        maxFiles: 1,
        accept: {
            "image/*": [".jpeg", ".png"],
        }
    });

    useEffect(() => {
        if (acceptedFiles.length != 0 && onInput){
            onInput(acceptedFiles[0])
        }    
    }, [acceptedFiles])

    return (
        <Box
            {...getRootProps()}
            sx={{
                minWidth: width,
                minHeight: height,
                aspectRatio: form != "rectangle" ? "1/1" : aspectRatio,
            }}
        >
            {src ? 
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        aspectRatio: form != "rectangle" ? 1 : aspectRatio,
                    }}
                >
                    <img 
                        src={src} 
                        alt={alt} 
                        style={{
                            borderRadius: form == "circle" ? "50%" : undefined,
                            width: "100%"
                        }}/>
                </Box>
                :
                <Box
                    sx={{
                        width: width,
                        height: height,
                        aspectRatio: form != "rectangle" ? "1/1" : aspectRatio,
                        borderRadius: form == 'circle' ? "50%" : undefined, 
                        border: "thin dashed var(--subtitle1-text-color)",
                    }}
                >
                    <Typography
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
                        )}
                    </Typography>
                </Box>
            }
            <input type="file" {...getInputProps()} />
        </Box>
    )
}