import { Controller, useForm } from 'react-hook-form'
import { useState } from "react";
import ImageInput from "../../../../components/ui/ImageInput";
import ImageCropper from "../../../../components/ImageCropper";
import { Box, Button } from '@mui/material';
import FormInput from '../../../../features/form/FormInput';
import FormTextarea from '../../../../features/form/FormTextarea';

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
                    <Controller
                        name='name' 
                        control={control} 
                        render={({field}) => (
                            <FormInput
                                {...field}
                                title="Название"
                                placeholder='Введите название'
                            />
                        )}
                    />
                    <Controller
                        name="about"
                        control={control} 
                        render={({field}) => (
                            <FormTextarea
                                {...field}
                                title="Описание"
                                placeholder='Описание здесь'
                            />
                        )}
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
                <Controller
                    name='vk_link' 
                    control={control} 
                    render={({field}) => (
                        <FormInput
                            {...field}
                            title="Ссылка вконтакте"
                            placeholder='Введите название' 
                        />
                    )}
                />
                <Controller
                    name='tg_link' 
                    control={control} 
                    render={({field}) => (
                        <FormInput
                            {...field}
                            title="Ссылка телеграм"
                            placeholder='Введите название'
                        />
                    )}
                />
                <Controller
                    name='discord_link'  
                    control={control} 
                    render={({field}) => (
                        <FormInput
                            {...field}
                            title="Ссылка дискорд"
                            placeholder='Введите название'
                        />
                    )}
                />
            </Box>
            <Button variant="contained" sx={{mt: "20px"}} type="submit">Отправить</Button>
        </form>
    )
}