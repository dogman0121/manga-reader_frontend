import { apiClient } from "../../../../utils/apiClient";

class TitleService {
    async fetchTitle(slug: string){
        const response = await apiClient.get(`/manga/${slug}`);
    
        return await response.json();
    }

    async sendRating(titleId: number, rating: number) {
        return await (await apiClient.post(`/manga/${titleId}/ratings`, {rating: rating})).json();
    }

    async getRating(titleId: number) {
        return await (await apiClient.get(`/manga/${titleId}/ratings`)).json();
    }
}

export const titleService = new TitleService();