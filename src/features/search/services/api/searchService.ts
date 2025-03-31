import { apiClient } from "../../../../utils/apiClient";

class SearchService {    
    async search(query: string, section: string, filters?: Map<string, Array<{id: number, name: string}>>) {
        const params = this.compileParams(query, section, filters);
        
        return await apiClient.get("/search?" + new URLSearchParams(params).toString())
    }

    compileParams(query: string, section: string, filters?: Map<string, Array<{id: number, name: string}>>) {
        const params = new URLSearchParams();

        if (query) params.set("query", query);
        
        params.set("section", section);
        
        filters?.forEach((value, key) => {
            value.forEach((option) => {
                params.append(key, option.id.toString())
            })
        })

        return params;
    }
}

export const searchService = new SearchService();