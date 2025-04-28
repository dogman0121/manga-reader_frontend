import { useDropzone } from "react-dropzone";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import "cropperjs/dist/cropper.css";

function BlockInput({ onAcceptFile } : { onAcceptFile: Function }) {
    const { acceptedFiles, getRootProps, getInputProps} = useDropzone({
        maxFiles: 1
    });

    useEffect(() => {
        if (acceptedFiles.length != 0)
            onAcceptFile(acceptedFiles[0]);

        return () => {}
    }, [acceptedFiles])

    return (
        <Box 
            {...getRootProps()}
            sx={{
                aspectRatio: "2/3",
                width: "120px",
            }}
        >
            <Box
                sx={{
                    p: "20px 10px",
                
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                    width: "100%",
                    height: "100%",
                    border: "2px dashed #D9D9D9",
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
                    <Typography 
                        sx={{
                            textAlign: "center", 
                            fontSize:"15px", 
                            mt: "5px", 
                            lineHeight: 1.2
                        }}
                    >
                        Добавить<br/>файл
                    </Typography>
                </Typography>
            </Box>
        </Box>
    )
}

export default BlockInput;