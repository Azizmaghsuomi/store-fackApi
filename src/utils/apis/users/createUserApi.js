import { apiClient } from '../../../constants/axios-interceptor'

const createUserApi = async (data) => {
    try {
        return await apiClient.post("/users", data)
    } catch (error) {
        return error
    }
}

export default createUserApi
