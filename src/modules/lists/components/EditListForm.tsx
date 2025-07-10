import { listService } from "../service/api/listService"
import List from "../types/List";
import ListForm, { ListFormProps } from "./ListForm"

export default function EditListForm({
    open,
    onClose,
    onSubmit,
    list
}: {
    open: boolean,
    onClose: () => void,
    onSubmit: Function,
    list: List | null
}) {
    const handleSubmit = async(data: ListFormProps) => {
        if (!list) return;

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        const response = await listService.updateList(list, formData);

        if (response.error)
            return;
        onSubmit?.(response.data)
    }

    return (
        <ListForm 
            open={open}
            title="Изменение списка"
            list={list}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    )
}