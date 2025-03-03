import { useContext, useState } from "react";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import SearchContext from "../../features/search/context/SearchContext";
import { SECTIONS } from "../../features/search/components/SearchProvider";

export enum SORTS {
    POPULARITY = "popularity",
    VIEWS = "views"
}

function SortList({options}: {options: Array<{id: number, name: string}>}) {
    const { filters, setFilters } = useContext(SearchContext);

    const [sort, setSort] = useState<string>(filters.get("order")?.[0]?.id.toString() || options[0].id.toString());

    const handleSort = (event: SelectChangeEvent) => {
        setSort(event.target.value);
        setFilters((prevFilters: Map<string, Array<{id: number, name: string}>>) => {
            const newFilters = new Map(prevFilters);
            newFilters.set("order", [{id: parseInt(event.target.value), name: ""}])
            return newFilters;
        })
    };

    return (
        <FormControl variant="standard">
        <Select
            value={sort}
            onChange={handleSort}
        >
            {options.map((option) => <MenuItem value={option.id} key={option.id}>{option.name}</MenuItem>)}
        </Select>
    </FormControl>
    )
}

function MangaSort() {
    return (
        <SortList options={[{id: 1, name: "по просмотрам"}, {id: 2, name: "по популярности"}]} />
    )
}

function TeamSort() {
    return (
        <SortList options={[{id: 1, name: "по популярности"}, {id: 2, name: "по подписчикам"}]} />
    )
}

function CatalogSorts() {
    const { section } = useContext(SearchContext);

    return (
        <>
            {section === SECTIONS.MANGA && (<MangaSort />)}
            {section === SECTIONS.TEAM && (<TeamSort />)}
        </>
    )
}

export default CatalogSorts;