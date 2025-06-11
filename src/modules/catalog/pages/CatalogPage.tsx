import { Box, Divider, Paper, useTheme } from "@mui/material";
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
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MobileDrawer from "../../../components/ui/MobileDrawer";
import MobileModal from "../../../components/ui/MobileModal";
import SearchListModal from "../../../features/search/components/SearchListModal";
import { useNavigate } from "react-router-dom";

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

    const navigate = useNavigate();

    const { section } = useContext(SearchContext);

    const [filtersOpened, setFiltersOpened] = useState(false);

    const [modalOpened, setModalOpened] = useState(false);

    return (
        <>
            <SearchProvider emptyQuery={true}>
                <AppContent>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            columnGap: theme.spacing(2)
                        }}
                    >
                        <ArrowBackRoundedIcon 
                            onClick={() => {navigate(-1)}}
                        />
                        <SearchInputDisabled 
                            onClick={() => {setModalOpened(true)}}
                        />
                        <MoreVertRoundedIcon 
                            onClick={() => {setFiltersOpened(true)}}
                        />
                    </Box>
                    <SearchSectionSelector
                        sx={{
                            mt: theme.spacing(2)
                        }}
                    />
                </AppContent>
                <Divider />
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
                <MobileModal
                    open={modalOpened}
                    onClose={() => {setModalOpened(false)}}
                >
                    <Box
                        sx={{
                            width: "100vw",
                            height: "100vh",
                            bgcolor: theme.palette.background.paper
                        }}
                    >
                        <AppContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    columnGap: theme.spacing(2)
                                }}
                            >
                                <ArrowBackRoundedIcon 
                                    onClick={() => {setModalOpened(false)}}
                                />
                                <SearchInput/>
                            </Box>
                            <SearchListModal sx={{mt: theme.spacing(3)}}/>
                        </AppContent>
                    </Box>
                </MobileModal>
            </SearchProvider>
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