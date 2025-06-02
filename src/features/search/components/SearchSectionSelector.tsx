import { BoxProps, styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import type {} from '@mui/material/themeCssVarsAugmentation';
import { SECTIONS } from "./SearchProvider";
import { useContext } from "react";
import SearchContext from "../context/SearchContext";

const SectionToggleGroup = styled(ToggleButtonGroup)(({theme}) => ({
    columnGap: theme.spacing(1),
}))

const SectionToggleButton = styled(ToggleButton)(({theme}) => ({
    padding: `3px ${theme.spacing(2)}`,
    textTransform: "none",
    border: "none",
    borderRadius: "6px",
    backgroundColor: theme.palette.background.paper,

    "&.MuiToggleButtonGroup-firstButton": {
        borderRight: "inherit",
        borderTopRightRadius: "inherit",
        borderBottomRightRadius:"inherit",
    },

    "&.MuiToggleButtonGroup-lastButton": {
        borderLeft: "inherit",
        borderTopLeftRadius: "inherit",
        borderBottomLeftRadius: "inherit",
    }
}))

function SearchSectionSelector({ sx }: BoxProps) {
    const { section, setSection } = useContext(SearchContext);

    const handleChoose = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
        setSection(newValue);
    }

    return (
        <SectionToggleGroup
            value={section}
            onChange={handleChoose}
            exclusive
            sx={{
                ...sx
            }}
        >
            <SectionToggleButton value={SECTIONS.MANGA}>манга</SectionToggleButton>
            <SectionToggleButton value={SECTIONS.TEAM}>команды</SectionToggleButton>
        </SectionToggleGroup>
    )
}

export default SearchSectionSelector;