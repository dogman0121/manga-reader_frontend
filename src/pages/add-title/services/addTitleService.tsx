import { apiClient } from "../../../utils/apiClient";

class AddTitleService {
    async addTitle(form: FormData) {
        // const response = await apiClient.sendForm("/manga/add", form)
        await apiClient.sendForm("/manga/add", form)
    }
}

export const addTitleService = new AddTitleService();