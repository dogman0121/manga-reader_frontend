import { useState } from "react";
import { useDeviceDetect, DEVICE } from "../../../hooks/useDeviceDetect";
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import { Button } from "@mui/material";


function SaveButton(){
    const { device } = useDeviceDetect();
    const [saved, setSaved] = useState(false);

    return (
        <Button 
            variant="contained" 
            fullWidth 
            onClick={() => setSaved(prev => !prev)}
            sx={{
                borderRadius: "12px"
            }}
        >
            {device !== DEVICE.MOBILE && saved && (
                "Сохранено"
            )}
            {device !== DEVICE.MOBILE && !saved && (
                "Сохранить"
            )}
            {device === DEVICE.MOBILE && saved && (
                <BookmarkAddRoundedIcon />
            )}
            {device === DEVICE.MOBILE && saved && (
                <BookmarkAddedRoundedIcon />
            )}
        </Button>
    )
}

export default SaveButton;