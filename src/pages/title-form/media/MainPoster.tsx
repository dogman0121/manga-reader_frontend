import { Box, Modal, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import Poster from "../types/Poster";
import Field from "./Field";
import PreviewPoster from "./PreviewPoster";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import PosterImage from "./PosterImage";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';


function Checked() {
    const theme = useTheme();

    return (
        <CheckRoundedIcon 
            sx={{
                width: "20px",
                height: "20px",
                p: "2px",
                bgcolor: theme.palette.success.light,
                borderRadius: "50%",
                color: "#000000",

                position: "absolute",
                right: 5,
                top: 5
            }}
        />
    )
}

function MainPoster() {
    const theme = useTheme();

    const { setValue, watch } = useFormContext();

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <Box>
            <Box>Основной постер</Box>
            <Field>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        columnGap: "10px"
                    }}
                >
                    <Box 
                        sx={{
                            aspectRatio: "2/3",
                            width: "120px",
                            height: "100%",
                            p: "20px 10px",
                            border: "2px dashed #D9D9D9",
                            borderRadius: "12px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        onClick={
                            () => {
                                setModalVisible(true);
                            }
                        }
                    >
                        <Typography 
                            variant="subtitle1"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center"
                            }}    
                        >
                            <ContentCopyRoundedIcon />
                            <Box 
                                sx={{
                                    textAlign: "center", 
                                    fontSize:"15px", 
                                    mt: "5px", 
                                    lineHeight: 1.2
                                }}
                            >
                                Выберите<br/>изображение
                            </Box>
                        </Typography>
                    </Box>
                    {watch("mainPoster") && <PreviewPoster poster={watch("mainPoster")} onDelete={() => {setValue("mainPoster", undefined)}}/>}
                </Box>
            </Field>
            <Modal
                open={modalVisible}
                onClose={() => {setModalVisible(false)}}
            >
                <Box
                    sx={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        p: "20px 15px",
                        borderRadius: "12px",
                        bgcolor: theme.palette.customBackgrounds?.widget1,

                        minWidth: "600px",
                        minHeight: "200px"
                    }}
                >
                    {watch("posters")?.length ?
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                columnGap: "10px",
                                rowGap: "15px",
                            }}
                        >
                            {watch("posters").map((poster: Poster, ind: number) =>
                                <Box key={ind} position="relative">
                                    <PosterImage
                                        poster={poster}
                                        onClick={() => {
                                            setValue("mainPoster", poster);
                                        }}
                                    />
                                    {poster.fileName === watch("mainPoster")?.fileName && <Checked />}
                                </Box>
                                )}
                        </Box>
                    :
                        <>
                            Ни одного изображения
                        </>
                    }
                    </Box>
            </Modal>
        </Box>
    )
}

export default MainPoster;