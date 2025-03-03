import { BoxProps, ToggleButton, ToggleButtonGroup} from "@mui/material";
import { SECTIONS } from "./SearchProvider";
import { useContext } from "react";
import SearchContext from "../context/SearchContext";

function SearchSectionSelector({ sx }: BoxProps) {
    const { section, setSection } = useContext(SearchContext);

    const handleChoose = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
        setSection(newValue);
    }

    return (
        <ToggleButtonGroup
            value={section}
            onChange={handleChoose}
            exclusive
            sx={{
                "& .MuiToggleButton-root": {
                    p: "3px 10px"
                },
                ...sx
            }}
        >
            <ToggleButton value={SECTIONS.MANGA}>манга</ToggleButton>
            <ToggleButton value={SECTIONS.TEAM}>команды</ToggleButton>
        </ToggleButtonGroup>
    )
}

export default SearchSectionSelector;