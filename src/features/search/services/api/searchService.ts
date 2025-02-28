import { apiClient } from "../../../../utils/apiClient";

class SearchService {    
    async search(query: string, section: string, filters: Map<string, number>) {
        const params = new URLSearchParams();
        params.set("q", query);
        params.set("s", section);

        filters.forEach((value, key) => {
            params.set(key, value.toString());
        })
        
        return await apiClient.get("/search?" + new URLSearchParams(params).toString())
    }
}

export const searchService = new SearchService();