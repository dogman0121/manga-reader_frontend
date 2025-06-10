import { createContext } from "react";
import { ReaderSettings } from "../service/readerSettingsService";

interface ReaderSettingsProps {
    settings: ReaderSettings,
    setSettings: Function,
}


const ReaderSettingsContext = createContext<ReaderSettingsProps>({
    settings: {
        infinityChapter: false,
        readingMode: "vertical"
    },
    setSettings: () => {},
});

export default ReaderSettingsContext;