import React, { useContext, useEffect, useState } from "react";
import { Box, ToggleButtonGroup, ToggleButton } from "@mui/material"
import SearchInput from "../../features/search/components/SearchInput";
import SearchProvider from "../../features/search/components/SearchProvider";
import SearchSectionSelector from "../../features/search/components/SearchSectionSelector";
import TableRowsIcon from '@mui/icons-material/TableRows';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import CatalogList from "./CatalogList";
import CatalogFilters from "./CatalogFilters";
import CatalogSorts from "./CatalogSorts";
import { DEVICE, useDeviceDetect } from "../../hooks/useDeviceDetect";
import MobileDrawer from "../../components/ui/MobileDrawer";
import SearchContext from "../../features/search/context/SearchContext";
import { searchService } from "../../features/search/services/api/searchService";
import { Content } from "../../layouts/app-layout/AppLayout";


export enum VIEWS {
    GRID = "grid",
    ROWS = "rows"
}


function CatalogWrapper({children}: {children: React.ReactNode}) {
    const { setQuery, query, setSection, section, setFilters, filters } = useContext(SearchContext);

    useEffect(() => {
        const [query, section, filters] = searchService.parseParams(new URL(window.location.href).searchParams);

        setQuery(query);
        setSection(section)
        setFilters(filters);
    }, [])

    useEffect(() => {
        window.history.pushState("", "",window.location.origin + window.location.pathname + "?" + searchService.compileParams(query, section, filters).toString())
    }, [query, section, filters]);
    


    return (
        <>
            {children}
        </>
    )
}


function CatalogPC() {
    const [view, setView] = useState<string>(VIEWS.GRID);

    const handleView = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
        setView(newValue);
    }

    return (
        <Content>
            <Box
                sx={{
                    fontSize: "40px",
                    mt: "15px"
                }}
            >
                Каталог
            </Box>
            <Box
                sx={{
                    mt: "10px"
                }}
            >
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
                                            p: "3px",
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
            </Box>
        </Content>
    )
}

function CatalogMobile() {
    const [filtersOpened, setFiltersOpened] = useState(false);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: "0 10px"
                }}
            >
                <CatalogSorts />
                <Box
                    onClick={() => {setFiltersOpened(true)}}
                >
                    Фильтры   
                </Box>
            </Box>
            <Box
                sx={{
                    mt: "10px"
                }}
            >
                <SearchInput />
                <SearchSectionSelector sx={{ mt: "8px" }}/>
                <CatalogList 
                    view="grid" 
                    sx={{
                        mt: "10px"
                    }}
                />
                <MobileDrawer
                    open={filtersOpened}
                    onClose={() => {setFiltersOpened(false)}}
                    anchor="right"
                    sx={{
                        p: "15px 10px"
                    }}
                >
                    <CatalogFilters />
                </MobileDrawer>
            </Box>
        </>
    )
}

function Catalog() {
    const device = useDeviceDetect();

    return (
        <SearchProvider>
            <CatalogWrapper>
                {device === DEVICE.MOBILE ?
                    <CatalogMobile/>
                    :
                    <CatalogPC/>
                }
            </CatalogWrapper>    
        </SearchProvider>
    )
}

export default Catalog;