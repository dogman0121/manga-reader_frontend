import { useState } from "react";
import FormFile from "../types/File";

export default function useFileInput(){
    // const [acceptedFiles, setAcceptedFiles] = useState<Array<File>>([]);
    const [acceptedFiles, setAcceptedFiles] = useState<Array<FormFile>>([]);

    const handleChange = (files: Array<FormFile>) => {
        // setAcceptedFiles(files.map(file => {
        //     const blob = file.file.slice(0, file.file.size, 'image/jpeg');
        //     return new File([blob], `${file.uuid}.jpg`, {type: 'image/jpeg'});
        // }))

        setAcceptedFiles(files);
    }

    return {handleChange, acceptedFiles}
}