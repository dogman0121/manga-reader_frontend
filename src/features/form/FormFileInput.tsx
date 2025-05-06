import { Box, Typography } from "@mui/material";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface FormFileInput {
    width?: string | number,
    height?: string | number,
    aspectRatio?: string,
    form?: "circle" | "square" | "rectangle",
    inputProps: DropzoneInputProps,
    rootProps: DropzoneRootProps
}

export default function FormFileInput({
    width,
    height,
    aspectRatio,
    form,
    inputProps, 
    rootProps
}: FormFileInput) {
    return (
        <Box {...rootProps}
        >
            <Box
                sx={{
                    width: width,
                    height: height,
                    aspectRatio: form != "rectangle" ? "1/1" : aspectRatio,
                    borderRadius: form == 'circle' ? "50%" : undefined, 
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
                                fontSize: "15px",
                                mt: "5px",
                                lineHeight: 1.2
                            }}
                        >
                            Добавить файл
                        </Box>
                        <Typography variant="subtitle1">
                            (.zip, .rar, .png. jpg)
                        </Typography></>
                    )}
                </Box>
            </Box>
            <input type="file" {...inputProps}/>
        </Box>
    )
}