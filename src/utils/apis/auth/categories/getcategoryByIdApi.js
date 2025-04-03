import React from 'react'
import { apiClient } from '../../../../constants/axios-interceptor'

const getcategoryByIdApi = async (id) => {
    try {
        return await apiClient.get(`/categories/${id}`)
    } catch (error) {
        return error
    }
}

export default getcategoryByIdApi
