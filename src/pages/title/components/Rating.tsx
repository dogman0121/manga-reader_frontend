import { useContext, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import Modal from "../../../features/modal/Modal";
import StarIcon from "./StarIcon";
import TitleContext from "../../../context/TitleContext";
import { titleService } from "../../../services/api/titleService";


function Rating({rating}: {rating: number}){
    const getBackground = (rating: number) => {
        if (rating < 4)
            return "#FF0000";
        else if (rating < 7)
            return "#FFCC00";
        else if (rating < 10)
            return "#33CC66";
        else
            return "#339900";
    } 

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                columnGap: "5px",
                whiteSpace: "nowrap"
            }}
        >
            Ваша оценка:
            <Box 
                sx={{
                    margin: "auto 0",
                    bgcolor: getBackground(rating),
                    borderRadius: "10px",
                    padding: "0.2px 6px 0.3px 6px",
                    fontSize: "14px",
                }}
                data-stars="${this.rating}"
            >
                <Box>{rating}</Box>
            </Box>
        </Box>
    )
}

function NoRating(){
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                columnGap: "5px",
                whiteSpace: "nowrap"
            }}
        >
            Оценить
            <StarIcon/>
        </Box>
    )
}

function RatingListOption({ number, text, onClick }: {number: number, text: string, onClick: Function}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                columnGap: "10px"
            }}
            onClick={() => {onClick(number)}}
        >
            <StarIcon />
            <Typography>{number}</Typography>
            <Typography>{text}</Typography>
        </Box>
    )
}

function RatingsList({onChoose}: {onChoose: Function}){

    const handleClick = async(number: number) => {
        onChoose(number);
    }

    return (
        <Paper
            sx={{
                p: "25px 20px",
                borderRadius: "16px",

                display: "flex",
                flexDirection: "column",
                rowGap: "5px"
            }}
        >
            <RatingListOption number={10} text="Превосходно" onClick={handleClick}/>
            <RatingListOption number={9} text="Супер" onClick={handleClick}/>
            <RatingListOption number={8} text="Отлично" onClick={handleClick}/>
            <RatingListOption number={7} text="Хорошо" onClick={handleClick}/>
            <RatingListOption number={6} text="Нормально" onClick={handleClick}/>
            <RatingListOption number={5} text="Неплохо" onClick={handleClick}/>
            <RatingListOption number={4} text="С пивом пойдет" onClick={handleClick}/>
            <RatingListOption number={3} text="Плохо" onClick={handleClick}/>
            <RatingListOption number={2} text="Ужасно" onClick={handleClick}/>
            <RatingListOption number={1} text="Отвратительно" onClick={handleClick}/>
        </Paper>
    )
}


function RatingButton() {
    const [modalOpened, setModalOpened] = useState(false);

    const { title } = useContext(TitleContext);

    const [proxiRating, setProxiRating] = useState<number | undefined>(title.user_rating);

    const handleChange = async(rating: number) => {
        const response = await titleService.sendRating(title.id, rating);

        if (!response.error){
            if (proxiRating == rating)
                return setProxiRating(undefined);

            return setProxiRating(rating);
        }
    }

    return (
        <>
            <Box
                sx={{
                    alignSelf: "end",

                    padding: "0 15px",
                    
                    display: "flex",
                    justifyContent: "center",
                    
                    marginTop: "4px",
                    
                    backgroundColor: "var(--dropdown-background)",
                    borderRadius: "6px",
                    height: "30px",

                    cursor: "pointer"
                }} 
                onClick={() => {setModalOpened(true)}}
            >
                {proxiRating ?
                    <Rating rating={proxiRating}/>
                    :
                    <NoRating />
                }
            </Box>

            <Modal
                open={modalOpened}
                onClose={() => {setModalOpened(false)}}
            >
                <RatingsList onChoose={handleChange}/>
            </Modal>
        </>
    )
}

export default RatingButton;