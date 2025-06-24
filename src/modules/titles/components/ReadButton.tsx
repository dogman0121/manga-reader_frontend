import Button from "../../../components/ui/Button";

export default function ReadButton() {
    return (
        <Button 
            sx={{
                width: "140px",
                borderRadius: "12px",
                height: "40px"
            }}
            variant="contained"
            disableElevation
            disableFocusRipple
        >
            Читать
        </Button>
    )
}