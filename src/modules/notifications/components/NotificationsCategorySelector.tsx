import { SxProps } from "@mui/material";
import { useContext } from "react";
import NotificationsContext from "../context/NotificationsContext";
import AppToggleGroup from "../../../components/ui/AppToggleButtonGroup";
import AppToggleButton from "../../../components/ui/AppToggleButton";

export default function NotificationsCategorySelector({sx}: {sx?: SxProps}) {
    const {category, setCategory} = useContext(NotificationsContext);
    
    const handleChoose = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
        if (newValue !== null)
            setCategory(newValue);
    }

    return (
        <AppToggleGroup
            value={category}
            onChange={handleChoose}
            exclusive
            sx={{
                ...sx
            }}
        >
            <AppToggleButton value="all">все</AppToggleButton>
            <AppToggleButton value="comments">комментарии</AppToggleButton>
            <AppToggleButton value="marks">оценки</AppToggleButton>
            <AppToggleButton value="manga">тайтлы</AppToggleButton>
        </AppToggleGroup>
    )
}