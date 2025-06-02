import { apiClient } from "../../../../utils/apiClient";

class SearchService {    
    async search(query: string, section: string, filters?: Map<string, string[]>) {
        const params = this.compileParams(query, section, filters);
        
        const response = await apiClient.get("/search?" + new URLSearchParams(params).toString())
        return await response.json();
    }

    compileParams(query: string, section: string, filters?: Map<string, string[]>) {
        const params = new URLSearchParams();

        if (query) params.set("query", query);
        
        params.set("section", section);
        
        filters?.forEach((value, key) => {
            value.forEach((option) => {
                params.append(key, option);
            })
        })

        return params;
    }

    parseParams(params: URLSearchParams){
        let query = "";

        let section = "manga";

        let filters = new Map<string, string[]>();

        for (let [name, val] of params.entries()){
            if (name == "query")
                query = val;
            else if (name == "section")
                section = val;
            else {
                const lst = filters.get(name) || [];
                lst.push(val)

                filters.set(name, lst);
            }

        }

        return [query, section, filters];
    }
}

export const searchService = new SearchService();