class StorageService {
    baseUrl = "https://kanwoo.ru/uploads/"

    getUrl(url: string){
        return this.baseUrl + url;
    }

    getMangaUrl(fileName: string) {
        return this.baseUrl + "manga/" + fileName;
    }
}

export const storageService = new StorageService();