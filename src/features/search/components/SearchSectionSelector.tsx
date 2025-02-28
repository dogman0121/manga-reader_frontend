import { BoxProps, ToggleButton, ToggleButtonGroup, toggleButtonClasses, toggleButtonGroupClasses } from "@mui/material";
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
                [`& .${toggleButtonGroupClasses.grouped}`]: {
                    border: 0,
                    borderRadius: "6px",
                    [`&.${toggleButtonGroupClasses.disabled}`]: {
                      border: 0,
                    },
                },
                [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
                {
                    marginLeft: "5px",
                    borderLeft: '1px solid transparent',
                },
                [`& .${toggleButtonClasses.root}`] : {
                    padding: "3px 10px",
                    fontSize: "13px",
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