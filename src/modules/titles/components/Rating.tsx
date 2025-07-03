import { Box, SxProps, Typography, useTheme } from "@mui/material";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import { useState } from "react";
import Modal from "../../../features/modal/Modal";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { titleService } from "../service/api/titleService";
import useTitle from "../hooks/useTitle";

function StarIcon({sx}: {sx?: SxProps}) {
    return <StarRoundedIcon 
        sx={{
            color: "#FFD600",
            ...sx
        }}
    />
}

export function RatingIndicator({sx, rating}: {sx?: SxProps, rating: number}) {
    const colors = {
        bad: "#FF0000",
        normal: "#FFCC00",
        good: "#33CC66",
        excellent: "#339900"
    }
    
    const getColor = (rating: number) => {
        if (rating < 4)
            return colors.bad;
        if (rating < 7)
            return colors.normal;
        if (rating < 10)
            return colors.good
        return colors.excellent;
    }

    return (
        <Box
            sx={{
                background: getColor(rating),
                lineHeight: 1,
                p: "3px 5px",
                borderRadius: "50px",
                color: "#e1e1e0",
                ...sx
            }}
        >
            {rating}
        </Box>
    )
}


export function RatingMobile({sx, rating}: {sx?: SxProps, rating?: number}) {
    const theme = useTheme();

    if (rating == undefined)
        return (
            <Box
                sx={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: theme.palette.background.paper,
                    cursor: "pointer",
                    ...sx
                }}
            >
                <StarIcon sx={{width: "30px", height: "30px"}}/>
            </Box>
        )

    return (
        <RatingIndicator 
            rating={rating} 
            sx={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                ...sx
            }}
        />
    )
}

export function RatingPC({sx, rating}: {sx?: SxProps, rating?: number}) {
    const theme = useTheme();

    if (rating == undefined)
        return (
            <Typography
                sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    ...sx
                }}
            >Оценить <StarIcon sx={{ml: theme.spacing(1)}}/></Typography>
        )

    return (
        <Typography
            sx={{
                display: "flex",
                alignItems: "center",
                ...sx
            }}
        >Ваша оценка: <RatingIndicator rating={rating} sx={{ml: theme.spacing(1)}}/></Typography>
    )

}

export default function Rating({sx}: {sx?: SxProps}) {
    const theme = useTheme();

    const { title } = useTitle();
    
    const {device} = useDeviceDetect();

    const [rating, setRating] = useState<number | undefined>(title?.user_rating || undefined);

    const [modalOpened, setModalOpened] = useState(false);

    const ratingsList = [
        {
            number: 1,
            text: "Отвратительно"
        },
        {
            number: 2,
            text: "Ужасно"
        },
        {
            number: 3,
            text: "Плохо"
        },
        {
            number: 4,
            text: "С пивом пойдет"
        },
        {
            number: 5,
            text: "Неплохо"
        },
        {
            number: 6,
            text: "Хорошо"
        },
        {
            number: 7,
            text: "Отлично"
        },
        {
            number: 8,
            text: "Супер"
        },
        {
            number: 9,
            text: "Превосходно"
        },
        {
            number: 10,
            text: "Превосходно!!!"
        }
    ]

    if (title == null)
        return null;

    const handleSetRating = async (newRating: number) => {
        const {error} = await titleService.sendRating(title.id, newRating);
        if (error)
            return;

        if (newRating == rating)
            setRating(undefined);
        else 
            setRating(newRating);
    }

    return (
        <>
            <Box
                onClick={() => {setModalOpened(true)}}
            >
                {device == DEVICE.MOBILE && (<RatingMobile sx={sx} rating={rating}/>)}
                {device == DEVICE.PC && (<RatingPC sx={sx} rating={rating}/>)}
                {device == DEVICE.PAD && (<RatingPC sx={sx} rating={rating}/>)}
            </Box>
            <Modal
                open={modalOpened}
                onClose={() => {setModalOpened(false)}}
            >
                <Box
                    sx={{
                        bgcolor: theme.palette.background.paper,
                        borderRadius: "12px",
                        p: theme.spacing(3),
                        width: "250px"
                    }}
                >
                    <Box>
                        <Typography textAlign="center" fontSize="16px">Рейтинг</Typography>
                    </Box>
                    <Box
                        sx={{
                            mt: theme.spacing(3),
                            display: "flex",
                            flexDirection: "column",
                            rowGap: theme.spacing(2)
                        }}
                    >
                        {ratingsList.map((r) => (
                            <Box 
                                key={r.number}
                                onClick={() => {handleSetRating(r.number)}}
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    columnGap: theme.spacing(2),
                                    alignItems: "center"
                                }}
                            >
                                <StarIcon />
                                <Typography>{r.number}</Typography>
                                <Typography>{r.text}</Typography>
                            </Box>
                        ))}
                        
                    </Box>
                </Box>
            </Modal>
        </>
    )
}