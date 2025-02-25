import { useState, useEffect } from "react";

export enum DEVICE {
    MOBILE,
    PAD,
    PC
}

export const useDeviceDetect = () => {
    const getDeviceType = () => {
        if (window.innerWidth < 768)
            return DEVICE.MOBILE;
        else if (window.innerWidth < 1096)
            return DEVICE.PAD
        else
            return DEVICE.PC;
    }

    const [device, setDevice] = useState(getDeviceType());
  
    useEffect(() => {
        const handleResize = () => setDevice(getDeviceType());

        window.addEventListener('resize', handleResize);
        return () => {window.removeEventListener('resize', handleResize)};
    }, []);
  
    return device;
};