import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect"
import { AppContent } from "../../../layouts/app-layout/AppLayout";
import NotFound from "../../../pages/not-found/NotFound";
import ListProvider from "../components/ListProvider";
import useList from "../hooks/useList";
import { useParams } from "react-router-dom";
import { AppHeaderMobile } from "../../../layouts/app-layout/AppLayoutMobile";
import { useEffect, useState } from "react";
import { listService } from "../service/api/listService";
import ListPageHeader from "../components/ListPageHeader";
import ListPageNavButtons from "../components/ListPageNavButtons";
import ListPageSavesIndicator from "../components/ListPageSavesIndicator";
import ListPageDescription from "../components/ListPageDescription";
import ListPageTitles from "../components/ListPageTitles";

function ListPageMobile() {
    const {list} = useList();

    if (!list)
        return <NotFound />

    return (
        <>
            <AppHeaderMobile 
                backArrow
                firstLine={"Список"}
            />
            <AppContent>
                <ListPageHeader />
                <ListPageSavesIndicator />
                <ListPageDescription />
                <ListPageNavButtons />
                <ListPageTitles />
            </AppContent>
        </>
    )
}

function ListPagePC() {
    const {list} = useList();

    if (!list)
        return <NotFound />

    return (
        <>
            <AppContent>
                <ListPageHeader />
                <ListPageSavesIndicator />
                <ListPageDescription />
                <ListPageNavButtons />
                <ListPageTitles />
            </AppContent>
        </>
    )
}

export default function ListPage() {
    const {device} = useDeviceDetect();

    const {listId} = useParams();

    const [list, setList] = useState(null);

    useEffect(() => {
        if (!listId || isNaN(parseInt(listId))) return;

        listService.getList(parseInt(listId))
            .then(({data}) => {
                setList(data)
            })
    }, [listId])

    return (
        <ListProvider
            list={list}
            setList={setList}
        >
            <>
                {device == DEVICE.MOBILE && (<ListPageMobile />)}
                {device == DEVICE.PAD && (<ListPagePC />)}
                {device == DEVICE.PC && (<ListPagePC />)}
            </>
        </ListProvider>
    )
}