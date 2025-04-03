import { apiClient } from "../../../../constants/axios-interceptor"

const getCategoriesApi = async () => {
    try {
        return await apiClient.get("/categories")
    } catch (error) {
        return error
    }
}

export default getCategoriesApi
