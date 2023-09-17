import axios, { AxiosError } from 'axios'
import { alertMessage } from './toast'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (responseError: AxiosError) => {
    if (responseError.response && (responseError.response.status >= 400 || responseError.response.status <= 499)) {
      const { error } = responseError.response.data as any
      alertMessage(error, 'warning')
    }
    else
      alertMessage("Ops! Não foi possível carregar o vídeo. Tente novamente.", 'error')

    return Promise.reject(responseError)
  })