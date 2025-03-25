import { useState, useRef } from "react";
import { Box, Button } from "@mui/material";
import { Cropper, ReactCropperElement } from "react-cropper";
import Modal from "../../../../features/modal/Modal";
import "cropperjs/dist/cropper.css";
import {v4 as uuidv4} from 'uuid';
import BlockInput from "./BlockInput";


function PosterBlockInput({ onAcceptFile } : { onAcceptFile: Function }){
    const cropperRef = useRef<ReactCropperElement | null>(null);

    const [cropperOpened, setCroppedOpened] = useState(false);

    const [fileUrl, setFileUrl] = useState("");

    const onCrop = () => {
        const cropper = cropperRef.current?.cropper;

        if (!cropper)
            return;
        
        const dataURL = cropper.getCroppedCanvas({width: 1400, height: 2100}).toDataURL();
        const blobs = atob(dataURL.split(',')[1]);

        let array = [];
        for(let i = 0; i < blobs.length; i++) {
            array.push(blobs.charCodeAt(i));
        }
        const file = new File([new Uint8Array(array)], `${uuidv4()}.jpg`, {type: 'image/jpg'});
        
        onAcceptFile(file);
        setCroppedOpened(false);
    }

    return (
        <>
            <BlockInput onAcceptFile={(file: File) => {setCroppedOpened(true); setFileUrl(URL.createObjectURL(file))}}/>
            <Modal
                open={cropperOpened}
                onClose={() => {setCroppedOpened(false)}}
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
                        aspectRatio={2/3}
                        ref={cropperRef}
                        cropBoxResizable={false}
                        cropBoxMovable={false}
                        viewMode={1}
                        dragMode="move"
                        src={fileUrl}
                    />
                    <Button 
                        variant="contained"
                        onClick={onCrop}
                        sx={{
                            mt: "20px",
                            alignSelf: "flex-end"
                        }}
                    >
                        Обрезать
                    </Button>
                </Box>
                
            </Modal>
        </>
    )
}

export default PosterBlockInput;