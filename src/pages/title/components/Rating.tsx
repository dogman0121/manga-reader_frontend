import { useState } from "react";
import { Box } from "@mui/material";
import Modal from "../../../features/modal/Modal";
import StarIcon from "./StarIcon";


// function Rating(){
//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 columnGap: "5px",
//                 whiteSpace: "nowrap"
//             }}
//         >
//             Ваша оценка:
//             <Box 
//                 sx={{
//                     margin: "auto 0",
//                     color: "white",
//                     borderRadius: "10px",
//                     padding: "0.2px 6px 0.3px 6px",
//                     fontSize: "16px",
//                     marginLeft: "5px"
//                 }}
//                 data-stars="${this.rating}"
//             >
//                 <Box ml={"5px"}></Box>
//             </Box>
//         </Box>
//     )
// }

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

function RatingsList(){
    return (
        <div>-------fsdfd</div>
    )
}


function RatingButton() {
    const [modalOpened, setModalOpened] = useState(false);

    return (
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
            <NoRating />
            <Modal
                open={modalOpened}
                onClose={() => {setModalOpened(false)}}
            >
                <RatingsList/>
            </Modal>
        </Box>
    )
}

export default RatingButton;