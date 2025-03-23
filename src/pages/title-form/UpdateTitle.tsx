import { Link, useParams } from "react-router-dom";
import TitleForm, { compileFormData, parseTitleData } from "./TitleForm";
import { SubmitHandler } from "react-hook-form";
import AddTitleForm from "./types/AddTitleForm";
import { useEffect } from "react";
import { apiClient } from "../../utils/apiClient";
import { useState } from "react";
import Title, { EMPTY_TITLE } from "../../types/Title";
import { Box, Typography } from "@mui/material";
import Modal from "../../features/modal/Modal";
import ErrorIcon from '@mui/icons-material/Error';
import { getColorScheme } from "../../utils/colorScheme";
import { storageService } from "../../services/api/storageService";
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import Poster from "../../components/ui/Poster";
import { SnackbarCloseReason } from '@mui/material/Snackbar';
import Notification from "../../components/ui/Notification";
import fetchTitle from "../../services/api/fetchTitle";


enum ERROR {
    NOT_FOUND = 1,
    FORBIDDEN = 2
}

function TitleBar({ title }: {title: Title}) {
    return (
        <Box>
            <Link to={`/manga/${title.id}`}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <WestRoundedIcon 
                        sx={{
                            color: "var(--subtitle1-text-color)",
                            width: "20px",
                            height: "20px"
                        }}
                    />
                    <Typography
                        variant="subtitle1"
                        sx={{
                            ml: "5px",
                            fontSize: "14px",
                            textTransform: "uppercase"
                        }}
                    >
                        Вернуться к тайтлу
                    </Typography>
                </Box>
            </Link>
            <Box
                sx={{
                    mt: "5px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: "15px"
                }}
            >
                <Poster
                    src={title.main_poster?.small || ""}
                    width={"75px"}
                />
                <Box>
                    {title.name}
                </Box>
            </Box>
        </Box>
    )
}

function UpdateTitle() {
    const { id } = useParams();

    const [title, setTitle] = useState<Title>(EMPTY_TITLE);

    const [error, setError] = useState<ERROR>();

    const processTitle = async() => {
        const title: Title = await fetchTitle(parseInt(id || ""));

        if (!title.permissions?.edit)
            setError(ERROR.FORBIDDEN);

        if (title === EMPTY_TITLE)
            setError(ERROR.NOT_FOUND);

        setTitle(title);
    }

    useEffect(() => {
        processTitle();

        return () => {};
    }, []);


    const [notificationOpened, setNotificationOpened] = useState(false);
    const [notificationVariant, setNotificationVariant] = useState<"success" | "error">("success");
    const [notificationMessage, setNotificationMessage] = useState("");

    const onSubmit: SubmitHandler<AddTitleForm> = async (data) => {
        const form = compileFormData(data);

        const response = await apiClient.sendForm(`/manga/${title.id}/edit`, "PUT", form);

        if (response.ok){
            setTitle(await response.json())
            setNotificationOpened(true);
            setNotificationVariant("success");
            setNotificationMessage("Изменения сохранены");
        } else {
            setNotificationOpened(true);
            setNotificationVariant("error");
            setNotificationMessage("При отправке формы произошла ошибка");
        }

        setNotificationOpened(true);
    }

    const handleClose = (
        _event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
        ) => {
            if (reason === 'clickaway') {
            return;
            }
    
        setNotificationOpened(false);
    };

    return (
        <>
            <Box>
                {title !== EMPTY_TITLE && ( 
                    <TitleBar title={title}/>
                )}
                <Box mt={"8px"}>
                    <TitleForm 
                        onSubmit={onSubmit} 
                        initialValue={parseTitleData(title)}
                    />
                </Box>
            </Box>
            <Notification
                variant={notificationVariant}
                open={notificationOpened}
                onClose={handleClose}
                message={notificationMessage}
            />
            {error && (
                <Modal
                    open={true}
                    sx={{
                        "& .MuiBackdrop-root": {
                            bgcolor: getColorScheme() === "light" ? "rgb(255 255 255 / 50%)" : "rgba(0, 0, 0, 0.7)"
                        }
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            columnGap: "10px",
                            alignItems: "center"
                        }}
                    >
                        <ErrorIcon 
                            sx={{
                                width: "35px",
                                height: "35px",
                                color: "#FF0000"
                            }}
                        />
                        <Box
                        >
                            {error == ERROR.NOT_FOUND && (
                                <>
                                    <Typography fontSize={18}>Упс... Такого тайтла нет!</Typography>
                                    <Typography fontSize={14}>Проверьте правильность URL</Typography>
                                </>
                            )}
                            {error === ERROR.FORBIDDEN && (
                                <>
                                    <Typography fontSize={18}>Упс... У вас нет доступа!</Typography>
                                    <Typography fontSize={14}>Обратитесь к администраторам</Typography>
                                </>
                            )}
                        </Box>
                    </Box>
                </Modal>
            )}
        </>
    )
}

export default UpdateTitle;