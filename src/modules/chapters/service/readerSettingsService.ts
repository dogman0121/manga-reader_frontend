const defaultSettings: ReaderSettings = {
    readingMode: "vertical",
    infinityChapter: false
}

export interface ReaderSettings {
    readingMode: "vertical" | "horizontal",
    infinityChapter: boolean
}

class ReaderSettingsService {
    settings: ReaderSettings

    constructor() {
        const rawSettings = localStorage.getItem("reader-settings");
        this.settings = rawSettings ? JSON.parse(rawSettings) : defaultSettings
    }

    _save() {
        localStorage.setItem("reader-settings", JSON.stringify(this.settings))
    }

    setReadingMode(value: "vertical" | "horizontal") {
        this.settings.readingMode = value;
        this._save();
    }

    setInfinityChapter(value: boolean){
        this.settings.infinityChapter = value;
        this._save();
    } 

    getReadingMode() {
        return this.settings.readingMode
    }

    getInfinityChapter(){
        return this.settings.infinityChapter;
    }

    getSettings(){
        return this.settings;
    }

    setSettings(settings: ReaderSettings) {
        this.settings = settings;
        this._save();
    }
}

export const readerSettingsService = new ReaderSettingsService()