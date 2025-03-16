import { BoxProps, ToggleButton, ToggleButtonGroup } from "@mui/material";
import type {} from '@mui/material/themeCssVarsAugmentation';
import { useTheme } from "@mui/material/styles";
import { SECTIONS } from "./SearchProvider";
import { useContext } from "react";
import SearchContext from "../context/SearchContext";

function SearchSectionSelector({ sx }: BoxProps) {
    const { section, setSection } = useContext(SearchContext);

    const handleChoose = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
        setSection(newValue);
    }

    const theme = useTheme();

    return (
        <ToggleButtonGroup
            value={section}
            onChange={handleChoose}
            exclusive
            sx={{
                "& .MuiToggleButton-root": {
                    p: "3px 10px"
                },
                "& .Mui-selected": {
                    bgcolor: theme.vars.palette.primary.main,
                    color: "#000000",
                    "&:hover": {
                        bgcolor: `rgba(${theme.vars.palette.primary.mainChannel} / 0.75)`,
                    }
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