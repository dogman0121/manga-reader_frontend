import { Box, Button, useTheme } from "@mui/material";
import List from "../types/List";
import AppModal from "../../../components/AppModal";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../../features/form/components/FormInput";
import FormTextarea from "../../../features/form/components/FormTextarea";

export interface ListFormProps {
    name: string,
    description: string
}

export default function ListForm({
    title,
    open,
    onClose,
    list, 
    onSubmit
}: {
    title: string,
    open: boolean,
    onClose: () => void,
    list?: List | null, 
    onSubmit: SubmitHandler<ListFormProps>
}) {

    const {handleSubmit, control} = useForm<ListFormProps>({
        defaultValues: {
            name: list?.name || "",
            description: list?.description || ""
        }
    });

    const theme = useTheme()

    return (
        <AppModal
            open={open}
            onClose={onClose}
            title={title}
            sx={{
                width: "min(400px, 100vw)"
            }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: theme.spacing(2)
                        }}
                    >
                        <Controller 
                            name="name"
                            control={control}
                            render={({field}) => (
                                <FormInput
                                    fullWidth 
                                    title="Название"
                                    placeholder="Введите название"
                                    {...field}

                                />
                            )}
                        />
                        <Controller 
                            name="description"
                            control={control}
                            render={({field}) => (
                                <FormTextarea 
                                    title="Описание"
                                    fullWidth
                                    placeholder="Введите описание"
                                    {...field}

                                />
                            )}
                        />
                    </Box>
                    <Box
                        sx={{
                            mt: theme.spacing(2)
                        }}
                    >
                        <Button type="submit">Сохранить</Button>
                        <Button onClick={onClose}>Отмена</Button>
                    </Box>
                </Box>
            </form>
        </AppModal>
    )
}