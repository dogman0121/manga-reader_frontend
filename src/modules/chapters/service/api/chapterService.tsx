import { apiClient } from "../../../../utils/apiClient";

class ChapterService {
    async addChapter(chapterForm: FormData) {
        const response = await apiClient.sendForm("/chapters", "POST", chapterForm);
        return await response.json();
    }

    async updateChapter(chapterId: number, chapterForm: FormData) {
        const response = await apiClient.sendForm(`/chapters/${chapterId}`, "PUT", chapterForm);
        return await response.json();
    }

    async getChapter(chapterId: number) {
        const response = await apiClient.get(`/chapters/${chapterId}`);
        return await response.json();
    }

    async getTranslationChapters(translationId: number) {
        const response = await apiClient.get(`/chapters?translation=${translationId}`);
        return await response.json();
    }
}

export const chapterService = new ChapterService();