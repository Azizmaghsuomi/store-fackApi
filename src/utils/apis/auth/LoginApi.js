import { apiClient } from "../../../constants/axios-interceptor";



const loginApi = async (data) => {
    try {
        return await apiClient.post("auth/login", data)
    } catch (error) {
        return error
    }
}

export default loginApi
