import axios from "axios";
import { getCookie, setCookie } from "../utils/helpers/cookie";
import refreshTokenApi from "../utils/apis/auth/refreshTokenApi";


const getAccessToken = async () => {
    const cookie = await getCookie("credential")
    return cookie?.access_token
}

const getRefreshToken = async () => {
    const cookie = await getCookie("credential")
    return cookie?.refresh_token
}

export const apiClient = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1",

})

apiClient.interceptors.request.use(
    async (config) => {
        const access_token = await getAccessToken();
        if (access_token) {
            config.headers["Authorization"] = `Bearer ${access_token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
)


apiClient.interceptors.response.use(response => response, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 404 && !originalRequest?._retry) {
        originalRequest._retry = true
        try {
            const refreshToken = await getRefreshToken()
            const response = await refreshTokenApi({ refreshToken: refreshToken })

            const newAccessToken = response?.data?.access_token
            const newRefreshToken = response?.data?.refreshToken

            const lastCookie = await getCookie("credential")
            const newCookie = { ...lastCookie, access_token: newAccessToken, refreshToken: newRefreshToken }

            console.log("new credntial is \n: ", newCookie)

            await setCookie("credential", newCookie)

            apiClient.defaults.headers["Authorization"] = `Bearar ${newAccessToken}`

            originalRequest.headers["Authorization"] = `Bearar ${newAccessToken}`

            return apiClient(originalRequest)
        } catch (error) {
            console.log("failed to submit new refresh token!")
            return Promise.reject(error)
        }
    }
    return Promise.reject(error)
})