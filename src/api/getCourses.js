import { createInstance } from "./axiosInstance"

export const getCourses = async (token) => {
    try {
        const axiosInstance = createInstance(token)
        const response = await axiosInstance.get('/core/preview-courses');
        return response.data
    } catch (error) {
        console.log('getCourses error', error);
    }
}