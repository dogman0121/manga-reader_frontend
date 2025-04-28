import { Box, Avatar, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useContext, useEffect, useState } from "react";
import ImageCropper from "../../../components/ImageCropper";
import UserProfileContext from "../../UserProfile/context/UserProfileContext";
import userService from "../../UserProfile/service/api/userService";
import UserAuthContext from "../../../context/UserAuthContext";
import Notification from "../../../components/ui/Notification";


interface InfoForm {
    login: string,
    about: string,
    avatar?: File,
}

export default function Info() {
    const {control, handleSubmit, setValue} = useForm<InfoForm>();

    const [cropperOpened, setCropperOpened] = useState(false);
    const [imgUrl, setImgUrl] = useState("");

    const {user: authUser} = useContext(UserAuthContext);
    const {setUser: setProfileUser, user: profileUser} = useContext(UserProfileContext);

    const [userAvatar, setUserAvatar] = useState(profileUser?.avatar);

    const [notificationOpened, setNotificationOpened] = useState(false);

    const { acceptedFiles, getRootProps, getInputProps} = useDropzone({
        maxFiles: 1,
        accept: {
            "image/*": [".jpeg", ".png"],
        }
    });

    useEffect(() => {
        if (!profileUser)
            return () => {};

        setValue("login", profileUser.login);
        setImgUrl(profileUser?.avatar || "");
        setValue("about", profileUser.about);
    }, [])

    useEffect(() => {
        if (acceptedFiles.length != 0){
            setImgUrl(URL.createObjectURL(acceptedFiles[0]));
            setCropperOpened(true);
        }    
    }, [acceptedFiles])


    const onSubmit = async (d: InfoForm) => {
        const formData = new FormData();
        formData.append("login", d.login);
        formData.append("about", d.about);

        if (d.avatar)
            formData.append("avatar", d.avatar);
        
        if (authUser){
            const {data} = await userService.updateUser(authUser.id, formData);
            setProfileUser(data);
            setNotificationOpened(true)
        }
        else{}
        
    }

    const onCrop = (file: File) => {
        setUserAvatar(URL.createObjectURL(file));
        setValue("avatar", file);
        setCropperOpened(false);
    } 

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "20px",
                }}
            >
                <Box {...getRootProps()}>
                    <Avatar src={userAvatar} sx={{width: "90px", height: "90px"}}/>
                    <input type="avatar" hidden {...getInputProps()}/>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "10px",
                        width: "100%"
                    }}
                >
                    <Controller 
                        name="login"
                        control={control}
                        defaultValue=""
                        render={({field}) => (
                            <TextField
                                {...field}
                                fullWidth
                                placeholder="Логин"
                            />
                        )}
                    />

                    <Controller 
                        name="about"
                        control={control}
                        defaultValue=""
                        render={({field}) => (
                            <TextField
                                {...field}
                                fullWidth
                                multiline
                                minRows={3}
                                placeholder="О себе"
                            />
                        )}
                    />
                </Box>
            </Box>
            <Button variant="contained" sx={{mt: "40px"}} type="submit">Сохранить</Button>
            <ImageCropper 
                aspectRatio={1}
                width={200}
                height={200}
                src={imgUrl}
                open={cropperOpened}
                onClose={() => {setCropperOpened(false)}}
                onCrop={onCrop}
            />
            <Notification 
                variant="success" 
                message="Изменения успешно сохранены" 
                open={notificationOpened} 
                onClose={() => {setNotificationOpened(false)}}
            />
        </form>
    )
}