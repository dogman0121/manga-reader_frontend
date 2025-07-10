import { listService } from "../service/api/listService"
import ListForm, { ListFormProps } from "./ListForm"

export default function CreateListForm({
    open,
    onClose,
    onSubmit
}: {
    open: boolean,
    onClose: () => void,
    onSubmit: Function
}) {
    const handleSubmit = async(data: ListFormProps) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        const response = await listService.addList(formData);
        if (response.error)
            return;
        onSubmit?.(response.data)
    }

    return (
        <ListForm 
            open={open}
            title="Изменение списка"
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    )
}