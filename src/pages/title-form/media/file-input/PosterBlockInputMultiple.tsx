import { useFormContext } from "react-hook-form";
import PosterBlockInput from "./PosterBlockInput";
import Poster from "../../types/Poster";


function BlockInputMultiple({ name } : { name: string }) {
    const {watch, setValue} = useFormContext();

    const onAcceptFile = (file: File) => {
        const newArray: Array<Poster> = watch(name) || [];

        let flag: boolean = false;
        newArray.forEach(pposter => (flag = flag || file.name === pposter.file?.name))

        if (!flag)
            newArray.push({fileName: file.name, file: file, fileUrl: URL.createObjectURL(file)});

        setValue("posters", newArray);
    }

    return (
        <PosterBlockInput
            onAcceptFile={onAcceptFile}
        />
    )
}

export default BlockInputMultiple;