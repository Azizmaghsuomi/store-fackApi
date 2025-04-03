import { apiClient } from '../../../constants/axios-interceptor'

const getUserInfoWithTokenApi = async (data) => {
    try {
        return await apiClient.get("/auth/profile", data)
    } catch (error) {
        return error
    }
}

export default getUserInfoWithTokenApi
