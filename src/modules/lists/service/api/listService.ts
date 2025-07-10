import { apiClient } from "../../../../utils/apiClient";
import Title from "../../../titles/types/Title";
import List from "../../types/List";

class ListService {
    async addList(listForm: FormData) {
        const response = await apiClient.sendForm("/lists", "POST", listForm)
        return await response.json();
    }

    async updateList(list: List, listForm: FormData) {
        const response = await apiClient.sendForm(`/lists/${list.id}`, "PUT", listForm);
        return await response.json();
    }

    async addTitle(list: List, title: Title) {
        const response = await apiClient.put(`/lists/${list.id}/manga`, {
            manga: title.id
        })
        return await response.json();
    }

    async removeTitle(list: List, title: Title) {
        const response = await apiClient.delete(`/lists/${list.id}/manga`, {
            manga: title.id
        })
        return await response.json();
    }

    async getList(listId: number) {
        const response = await apiClient.get(`/lists/${listId}`);
        return await response.json()
    }

    async addSave(list: List) {
        const response = await apiClient.post(`/lists/${list.id}/save`, {});

        return await response.json();
    }

    async removeSave(list: List) {
        const response = await apiClient.delete(`/lists/${list.id}/save`, {});

        return await response.json();
    }
}

export const listService = new ListService();