import { Children, useState } from "react";
import { ReaderSettings, readerSettingsService } from "../service/readerSettingsService"
import ReaderSettingsContext from "../context/ReaderSettingsContext";

export default function ReaderSettingsProvider({children}: {children?: React.ReactElement | React.ReactElement[]}) {
    const [settings, setSettings] = useState<ReaderSettings>(readerSettingsService.getSettings());

    const setSettingsWrapper = (newSettings: ReaderSettings) => {
        setSettings(() => newSettings);
        readerSettingsService.setSettings(newSettings);
    }

    return (
        <ReaderSettingsContext.Provider
            value={{setSettings: setSettingsWrapper, settings: settings}}
        >
            {Children.map(children, (child) => child)}
        </ReaderSettingsContext.Provider>
    )
}