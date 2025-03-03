import React, { useState } from "react";
import { Box, ToggleButtonGroup, ToggleButton } from "@mui/material"
import SearchInput from "../../features/search/components/SearchInput";
import SearchProvider from "../../features/search/components/SearchProvider";
import SearchSectionSelector from "../../features/search/components/SearchSectionSelector";
import TableRowsIcon from '@mui/icons-material/TableRows';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import CatalogList from "./CatalogList";
import CatalogFilters from "./CatalogFilters";
import CatalogSorts from "./CatalogSorts";


export enum VIEWS {
    GRID = "grid",
    ROWS = "rows"
}


function Catalog() {
    const [view, setView] = useState<string>(VIEWS.GRID);

    const handleView = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
        setView(newValue);
    }

    return (
        <>
            <Box
                sx={{
                    fontSize: "48px",
                    mt: "50px"
                }}
            >
                Каталог
            </Box>
            <Box
                sx={{
                    mt: "10px"
                }}
            >
                <SearchProvider>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "3fr 1fr",
                            rowGap: "15px",
                            columnGap: "10px"
                        }}
                    >
                        <Box>
                            <SearchInput />
                            <SearchSectionSelector sx={{ mt: "8px" }}/>
                        </Box>
                        <Box></Box>
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Box>
                                    <CatalogSorts />
                                </Box>
                                <Box>
                                    <ToggleButtonGroup
                                        value={view}
                                        exclusive
                                        onChange={handleView}
                                        sx={{
                                            "& .MuiToggleButton-root": {
                                                p: "5px",
                                            },
                                        }}
                                    >
                                        <ToggleButton value="grid">
                                            <AppsRoundedIcon/>
                                        </ToggleButton>
                                        <ToggleButton value="row">
                                            <TableRowsIcon/>
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Box>
                            </Box>
                            <CatalogList view={view} sx={{ mt: "10px"}}/>
                        </Box>
                        <Box>
                            <CatalogFilters />
                        </Box>
                    </Box>
                </SearchProvider>
            </Box>
        </>
    )
}

export default Catalog;