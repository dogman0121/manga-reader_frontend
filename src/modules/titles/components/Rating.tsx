import { Box, SxProps, Typography, useTheme } from "@mui/material";
import { Children, useState } from "react";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { titleService } from "../service/api/titleService";
import useTitle from "../hooks/useTitle";
import AppModal from "../../../components/AppModal";

export function RatingStarIcon({sx}: {sx?: SxProps}) {
    return <StarRoundedIcon 
        sx={{
            color: "#FFD600",
            ...sx
        }}
    />
}

export function RatingIndicator({
    sx, 
    rating,
    icon
}: {sx?: SxProps, rating: number, icon?: React.ReactElement}) {
    const colors = {
        bad: "#FF0000",
        normal: "#FFEF00",
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
                p: "3px 5px",
                borderRadius: "50px",
                ...sx
            }}
        >
            {icon && (
                icon
            )}
            <Typography
                sx={{
                    lineHeight: "1",
                    color: "#FFF"
                }}
            >
                {rating}
            </Typography>
            
        </Box>
    )
}

export function RatingContext({
    children,
    onSetRating
}: {children?: React.ReactElement, onSetRating?: Function}) {
    const { title } = useTitle();

    const [rating, setRating] = useState<number | null>(title?.user_rating || null);

    const [modalOpened, setModalOpened] = useState(false);


    if (title == null)
        return null;

    const handleSetRating = async (newRating: number) => {
        const {error} = await titleService.sendRating(title.slug, newRating);
        if (error)
            return;

        if (newRating == rating){
            setRating(null);
            onSetRating?.(null)
        }
        else {
            setRating(newRating);
            onSetRating?.(newRating)
        }
    }

    return (
        <Box
            onClick={() => {setModalOpened(true)}}
        >
            {Children.map(children, child => child)}
            <RatingModal 
                open={modalOpened}
                onClose={() => {setModalOpened(false)}}
                onSetRating={handleSetRating}
            />
        </Box>
    )
}

export function RatingModal({
    open,
    onClose,
    onSetRating
}: {
    open: boolean,
    onClose: () => void,
    onSetRating: Function
}) {

    const theme = useTheme()

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

    return (
        <AppModal
            title="Рейтинг"
            open={open}
            onClose={(event) => {
                onClose?.()
                event.stopPropagation()
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "300px",
                    rowGap: theme.spacing(2)
                }}
            >
                {ratingsList.reverse().map((r) => (
                    <Box 
                        key={r.number}
                        onClick={(e: React.MouseEvent) => {
                            onSetRating(r.number)
                            onClose?.()
                            e.stopPropagation()
                        }}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            columnGap: theme.spacing(2),
                            alignItems: "center",
                            cursor: "pointer"
                        }}
                    >
                        <RatingStarIcon />
                        <Typography fontSize={"16px"}>{r.number}</Typography>
                        <Typography>{r.text}</Typography>
                    </Box>
                ))}
                
            </Box>
        </AppModal>
    )
}