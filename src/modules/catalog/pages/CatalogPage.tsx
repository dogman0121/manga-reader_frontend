import { Box, Paper, useTheme } from "@mui/material";
import PageHeader from "../../../components/ui/PageHeader";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import SearchInput, { SearchInputDisabled } from "../../../features/search/components/SearchInput";
import SearchSectionSelector from "../../../features/search/components/SearchSectionSelector";
import { Children, useContext, useEffect, useState } from "react";
import SearchContext from "../../../features/search/context/SearchContext";
import SearchProvider, { SECTIONS } from "../../../features/search/components/SearchProvider";
import MangaResults from "../components/MangaResults";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import Filters from "../components/Filters";
import { searchService } from "../../../features/search/services/api/searchService";
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MobileDrawer from "../../../components/ui/MobileDrawer";
import StatusBar from "../../../components/StatusBar";
import SearchModal from "../../../features/search/components/SearchModal";
import { AppHeaderMobile } from "../../../layouts/app-layout/AppLayoutMobile";

function CatalogPagePC() {
    const theme = useTheme();

    const { section } = useContext(SearchContext);

    return (
        <AppContent>
            <PageHeader>Каталог</PageHeader>
            <Box 
                sx={{
                    mt: theme.spacing(1),
                    display: "flex",
                    flexDirection: "row",
                    columnGap: theme.spacing(3),
                }}
            >
                <Box sx={{width: "72%"}}>
                    <SearchInput />
                    <SearchSectionSelector sx={{mt: theme.spacing(1)}}/>
                    <Box
                        sx={{
                            mt: theme.spacing(4)
                        }}
                    >
                        {section == SECTIONS.MANGA && <MangaResults />}
                    </Box>
                </Box>
                <Paper
                    sx={{
                        p: theme.spacing(3),
                        boxShadow: "none",
                        borderRadius: "12px",
                        width: "28%",
                        height: "fit-content"
                    }}
                >
                    <Filters />
                </Paper>
            </Box>
        </AppContent>
    )
}

function CatalogPageMobile() {
    const theme = useTheme();

    const { query, section } = useContext(SearchContext);

    const [filtersOpened, setFiltersOpened] = useState(false);

    const [modalOpened, setModalOpened] = useState(false);

    return (
        <>
            <StatusBar 
                color={theme.palette.background.default}
            />
            <AppHeaderMobile
                backArrow
                firstLine={
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: theme.spacing(2),
                            alignItems: "center"
                        }}
                    >
                        <SearchInputDisabled 
                            onClick={() => {setModalOpened(true)}}
                            value={query}
                            placeholder="Поиск"
                        />
                        <MoreVertRoundedIcon 
                            onClick={() => {setFiltersOpened(true)}}
                        />
                    </Box>
                }
                secondLine={
                    <SearchSectionSelector/>
                }
            />
            <AppContent>
                <>
                    {section == SECTIONS.MANGA && <MangaResults />}
                </>
            </AppContent>
            <MobileDrawer
                open={filtersOpened}
                onClose={() => {setFiltersOpened(false)}}
                anchor="right"
            >
                <Filters />
            </MobileDrawer>
            <SearchModal open={modalOpened} onClose={() => {setModalOpened(false)}}/>
        </>
    )
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
        window.history.replaceState(
            "", 
            "",
            window.location.origin + window.location.pathname + "?" + searchService.compileParams(query, section, filters).toString()
        )
    }, [query, section, filters]);

    
    return <>{Children.map(children, (child) => child)}</>
}

export default function CatalogPage() {
    const { device } = useDeviceDetect();

    return (
        <SearchProvider emptyQuery={true}>
            <CatalogWrapper>
                {device == DEVICE.MOBILE && <CatalogPageMobile />}
                {device == DEVICE.PAD && <CatalogPagePC />}
                {device == DEVICE.PC && <CatalogPagePC />}
            </CatalogWrapper>
        </SearchProvider>
    )
}