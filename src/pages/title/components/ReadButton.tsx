import { Button } from "@mui/material";


function ReadButton() {
    return (
        <Button 
            sx={{
                width: "150px",
                height: "45px"
            }}
            variant="contained"
        >
            Читать
        </Button>
    )
}

export default ReadButton;