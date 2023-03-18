import { createInstance } from './axiosInstance'

const getToken = async () => {
  const axiosInstance = createInstance('');
  try {
    const response = await axiosInstance.get('/auth/anonymous?platform=subscriptions')
    return response.data
  } catch (error) {
    console.log('getToken error ', error)
  }
}

export { getToken }
