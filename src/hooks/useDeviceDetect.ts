import { useState, useEffect } from "react";



const useDeviceDetect = () => {
    const getDeviceType = () => {
        if (window.innerWidth < 768)
            return "mobile";
        else if (window.innerWidth < 1096)
            return "pad"
        else
            return "pc";
    }

    const [device, setDevice] = useState(getDeviceType());
  
    useEffect(() => {
        const handleResize = () => setDevice(getDeviceType());

        window.addEventListener('resize', handleResize);
        return () => {window.removeEventListener('resize', handleResize)};
    }, []);
  
    return { device };
  };

export default useDeviceDetect