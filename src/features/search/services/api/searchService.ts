import { apiClient } from "../../../../utils/apiClient";

class SearchService {
    async search(query: string) {
        await apiClient.get("/search?" + new URLSearchParams({
            q: query            
        }).toString())
    }
}

export const searchService = new SearchService();