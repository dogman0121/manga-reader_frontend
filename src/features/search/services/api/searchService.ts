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

    parseParams(params: URLSearchParams){
        let query = "";

        let section = "manga";

        let filters = new Map<string, Array<{id: number, name: string}>>();

        for (let [name, val] of params.entries()){
            if (name == "query")
                query = val;
            else if (name == "section")
                section = val;
            else {
                const lst = filters.get(name) || [];
                lst.push({id: parseInt(val || ""), name: ""})

                filters.set(name, lst);
            }

        }

        return [query, section, filters];
    }
}

export const searchService = new SearchService();