import { useContext } from "react";
import SearchContext from "../context/searchContext";
import { DEVICE, useDeviceDetect } from "../../../hooks/useDeviceDetect";

function SearchList() {
    const device = useDeviceDetect();
    
    return (
        <>
        </>
    )
}

export default SearchList;