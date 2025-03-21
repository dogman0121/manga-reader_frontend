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

enum ERROR {
    NOT_FOUND = 1,
    FORBIDDEN = 2
}

function UpdateTitle() {
    const { id } = useParams();

    const [title, setTitle] = useState<Title>(EMPTY_TITLE);

    const [error, setError] = useState<ERROR>();

    const fetchTitle = async() => {
        const response = await apiClient.get(`/manga/${id}`);
    
        const json = await response.json();

        if (response.status === 403 || !json.permissions?.edit) {
            setError(ERROR.FORBIDDEN);
        }

        if (response.status === 404){
            setError(ERROR.NOT_FOUND);
            return setTitle(EMPTY_TITLE);
        }

        setTitle(json || EMPTY_TITLE);
    }

    useEffect(() => {
        fetchTitle();

        return () => {};
    }, []);

    const onSubmit: SubmitHandler<AddTitleForm> = (data) => {
        const form = compileFormData(data);

        apiClient.sendForm(`/manga/${title.id}/edit`, "PUT", form);
    }

    return (
        <>
            <Box>
                {title !== EMPTY_TITLE && ( 
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
                                src={storageService.getUrl(`manga/${title.main_poster}`)}
                                width={"75px"}
                            />
                            <Box>
                                {title.name}
                            </Box>
                        </Box>
                    </Box>
                )}
                <Box mt={"8px"}>
                    <TitleForm 
                        onSubmit={onSubmit} 
                        initialValue={parseTitleData(title)}
                    />
                </Box>
            </Box>
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