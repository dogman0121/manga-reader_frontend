import { useForm, Controller, Control } from 'react-hook-form'
import TextField from '../../../../components/ui/TextField'
import { useState } from "react";
import ImageInput from "../../../../components/ui/ImageInput";
import ImageCropper from "../../../../components/ImageCropper";
import { Box, Button, TextFieldProps, Typography } from '@mui/material';

interface InfoFormProps {
    id: number,
    name: string,
    about: string,
    vk_link?: string,
    tg_link?: string,
    discord_link?: string,
    poster?: File
}



function PosterInput() {
    const [url, setUrl] = useState("");
    const [cropperUrl, setCropperUrl] = useState("");
    const [cropperVisible, setCropperVisible] = useState(false);

    const handleInput = (f: File) => {
        const url = URL.createObjectURL(f);

        setCropperUrl(url);
        setCropperVisible(true);
    }

    const handleCrop = (f: File) => {
        setUrl(URL.createObjectURL(f))
    }

    return (
        <>
            <ImageInput  
                width={"100px"}  
                form="circle" 
                onInput={handleInput}
                src={url}
            />

            <ImageCropper 
                width={120}
                height={120}
                aspectRatio={1}
                onCrop={handleCrop}
                src={cropperUrl}
                open={cropperVisible}
                onClose={() => {setCropperVisible(false)}}
            />
        </>
    )
}

interface FormInputProps {
    title: string, 
    control: Control<any, any>, 
    name: string, 
    placeholder: string
}

function FormInput({title, control, name,  ...rest} : FormInputProps & TextFieldProps) {
    return (
        <Box>
            <Typography>{title}</Typography>
            <Controller 
                name={name}
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        fullWidth
                        {...rest}
                    />  
                )}
            />
        </Box>
    )
}

function FormTextarea(props: FormInputProps & TextFieldProps) {
    return (
        <FormInput 
            {...props}
            multiline
            minRows={3}
        />
    )
}


export default function Info() {
    const {control, handleSubmit} = useForm<InfoFormProps>();

    const onSend = (_d: InfoFormProps) => {

    }

    return (
        <form onSubmit={handleSubmit(onSend)}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "20px"
                }}
            >
                <PosterInput />
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        flexDirection: "column",
                        rowGap: "5px"
                    }}
                >
                    <FormInput
                        title="Название"
                        placeholder='Введите название'
                        name='name' 
                        control={control}
                    />
                    <FormTextarea
                        name="about"
                        title="Описание"
                        placeholder='Описание здесь'
                        control={control}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "15px",
                    mt: "15px"
                }}
            >
                <FormInput
                    title="Ссылка вконтакте"
                    placeholder='Введите название'
                    name='vk_link' 
                    control={control}
                />
                <FormInput
                    title="Ссылка телеграм"
                    placeholder='Введите название'
                    name='tg_link' 
                    control={control}
                />
                <FormInput
                    title="Ссылка дискорд"
                    placeholder='Введите название'
                    name='discord_link' 
                    control={control}
                />
            </Box>
            <Button variant="contained" sx={{mt: "20px"}} type="submit">Отправить</Button>
        </form>
    )
}