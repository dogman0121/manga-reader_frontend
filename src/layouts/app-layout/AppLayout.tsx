import { DEVICE, useDeviceDetect } from "../../hooks/useDeviceDetect";
import AppLayoutMobile from "./AppLayoutMobile";
import AppLayoutPC from "./AppLayoutPC";
import {ContentPC} from "./AppLayoutPC";
import { ContentMobile } from "./AppLayoutMobile";

export function AppContent({children}: {children: React.ReactNode}) {
    const { device } = useDeviceDetect();

    return (
        <>
            {device == DEVICE.MOBILE ?
                <ContentMobile children={children}/>
                :
                <ContentPC children={children}/>
            }
        </>
    )
}

function AppLayout() {
    const { device } = useDeviceDetect();
    
    return (
        <>
            {device == DEVICE.MOBILE ?
                <AppLayoutMobile />
                :
                <AppLayoutPC />
            }
        </>
    )
}
export default AppLayout;