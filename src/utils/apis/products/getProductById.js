import { apiClient } from '../../../constants/axios-interceptor'

const getProductById = async (id) => {
    try {
        return await apiClient.get(`/products/${id}`)
    } catch (error) {
        return error
    }
}

export default getProductById
