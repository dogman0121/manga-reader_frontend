import { useRef } from "react";
import { Box, Button } from "@mui/material";
import { Cropper, ReactCropperElement } from "react-cropper";
import Modal from "../features/modal/Modal";
import "cropperjs/dist/cropper.css";
import {v4 as uuidv4} from 'uuid';

interface ImageCropperProps {
    src: string,
    width: number,
    height: number,
    aspectRatio: number,
    open: boolean,
    onClose: Function,
    onCrop: Function
}

export default function ImageCropper({src, open, onClose, width, height, aspectRatio, onCrop}: ImageCropperProps) {
    const cropperRef = useRef<ReactCropperElement | null>(null);

    const handleCrop = () => {
        const cropper = cropperRef.current?.cropper;

        if (!cropper)
            return;
        
        const dataURL = cropper.getCroppedCanvas({width: width, height: height}).toDataURL();

        const blobs = atob(dataURL.split(',')[1]);

        let array = [];
        for(let i = 0; i < blobs.length; i++) {
            array.push(blobs.charCodeAt(i));
        }
        const file = new File([new Uint8Array(array)], `${uuidv4()}.jpg`, {type: 'image/jpg'});
        
        onCrop(file);
    }

    return (
        <Modal
            open={open}
            onClose={() => {onClose()}}
        >
            <Box
                sx={{
                    p: "20px 25px",
                    bgcolor: "var(--paper-color)",
                    borderRadius: "16px",
                    width: "min(600px, 100vw)",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Cropper 
                    style={{ height: 400, width: "100%" }}
                    aspectRatio={aspectRatio}
                    ref={cropperRef}
                    cropBoxResizable={false}
                    cropBoxMovable={false}
                    viewMode={1}
                    dragMode="move"
                    src={src}
                />
                <Button 
                    variant="contained"
                    onClick={handleCrop}
                    sx={{
                        mt: "20px",
                        alignSelf: "flex-end"
                    }}
                >
                    Обрезать
                </Button>
            </Box>
            
        </Modal>
    )
}