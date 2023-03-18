import { createInstance } from "./axiosInstance"

export const getCourse = async (token, courseId) => {
    try {
        const axiosInstance = createInstance(token)
        const response = await axiosInstance.get(`/core/preview-courses/${courseId}`);
        return response.data
    } catch (error) {
        console.log('getCourse error', error);
    }
}