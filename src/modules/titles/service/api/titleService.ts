import { apiClient } from "../../../../utils/apiClient";

class TitleService {
    async fetchTitle(titleId: number){
        const response = await apiClient.get(`/manga/${titleId}`);
    
        if (response.ok){
            return await response.json();
        }
        else { 
            return null;
        }
    }

    async sendRating(titleId: number, rating: number) {
        return await (await apiClient.post(`/manga/${titleId}/ratings`, {rating: rating})).json();
    }

    async getRating(titleId: number) {
        return await (await apiClient.get(`/manga/${titleId}/ratings`)).json();
    }
}

export const titleService = new TitleService();