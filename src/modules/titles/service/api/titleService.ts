import { apiClient } from "../../../../utils/apiClient";

class TitleService {
    async fetchTitle(slug: string){
        const response = await apiClient.get(`/manga/${slug}`);
    
        return await response.json();
    }

    async sendRating(slug: string, rating: number) {
        return await (await apiClient.post(`/manga/${slug}/ratings`, {rating: rating})).json();
    }

    async getRating(slug: string) {
        return await (await apiClient.get(`/manga/${slug}/ratings`)).json();
    }
}

export const titleService = new TitleService();