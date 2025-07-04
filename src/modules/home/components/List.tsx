import { Box, Divider } from "@mui/material";
import PageHeader from "../../../components/ui/PageHeader";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import Title from "../../titles/types/Title";
import TitleItem from "../../../components/TitleItem";
import { AppHeaderMobile } from "../../../layouts/app-layout/AppLayoutMobile";

interface ListProps {
    title: string,
    titles: Title[]
}

function ListPC({title, titles}: ListProps) {
    return (
        <AppContent>
            <PageHeader>{title}</PageHeader>
            <Box
                sx={{
                    mt: "25px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: "15px"   
                }}
            >
                {titles.map(title => <TitleItem title={title}/>)}
            </Box>
        </AppContent>
    )    
}

function ListMobile({title, titles}: ListProps) {
    return (
        <>
            <AppHeaderMobile 
                backArrow
                firstLine={title}
            />
            <Divider />
            <AppContent>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                        gap: "15px"   
                    }}
                >
                    {titles.map(title => <TitleItem title={title}/>)}
                </Box>
            </AppContent>
        </>
    )
}

export default function List({...props}: ListProps) {
    const {device} = useDeviceDetect();
    
    return (
        <>
            {device == DEVICE.MOBILE && <ListMobile {...props}/>}
            {device == DEVICE.PAD && <ListPC {...props}/>}
            {device == DEVICE.PC && <ListPC {...props}/>}
        </>
    )
}