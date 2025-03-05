import { apiClient } from "../../../../utils/apiClient";

class SearchService {    
    async search(query: string, section: string, filters: Map<string, Array<{id: number, name: string}>>) {
        const params = new URLSearchParams();
        params.set("query", query);
        params.set("section", section);
        filters.forEach((value, key) => {
            value.forEach((option) => {
                params.append(key, option.id.toString())
            })
        })
        
        return await apiClient.get("/search?" + new URLSearchParams(params).toString())
    }
}

export const searchService = new SearchService();