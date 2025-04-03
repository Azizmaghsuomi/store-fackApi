import React from 'react'
import { apiClient } from '../../../constants/axios-interceptor'

const getProductByCategoryApi = async (id) => {
    try {
        return await apiClient.get(`/categories/${id}/products`)
    } catch (error) {
        return error
    }
}

export default getProductByCategoryApi
