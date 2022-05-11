import axios, { AxiosResponse } from 'axios'
import router from '../router/index'
import { useStore } from '../store/store'

const store = useStore()

store.baseUrl = import.meta.env.VITE_API_BASEURL

console.log(store.baseUrl)

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  timeout: 30000
})

export default class BaseHttpService {
  protected async get<T> (
    endpoint: string,
    options = {}
  ): Promise<AxiosResponse<T, any>> {
    Object.assign(options, this._getCommonOptions())
    return request
      .get(`/${endpoint}`, options)
      .catch(error => {
        return this._handleHttpError(error)
      })
  }

  protected async post<T> (
    endpoint: string,
    data = {},
    options = {}
  ): Promise<AxiosResponse<T, any>> {
    Object.assign(options, this._getCommonOptions())
    return request
      .post(`/${endpoint}`, data, options)
      .catch(error => {
        return this._handleHttpError(error)
      })
  }

  protected async delete<T> (
    endpoint: string,
    options = {}
  ): Promise<AxiosResponse<T, any>> {
    Object.assign(options, this._getCommonOptions())
    return request
      .delete(`/${endpoint}`, options)
      .catch(error => {
        return this._handleHttpError(error)
      })
  }

  protected async patch<T> (
    endpoint: string,
    data = {},
    options = {}
  ): Promise<AxiosResponse<T, any>> {
    Object.assign(options, this._getCommonOptions())
    return request
      .patch(`/${endpoint}`, data, options)
      .catch(error => {
        return this._handleHttpError(error)
      })
  }

  protected _handleHttpError (error: any) {
    console.log(error.response.data)
    const { statusCode } = error.response.data
    if (statusCode === 401) {
      this._handle401()
    }
    return Promise.reject(error)
  }

  protected _handle401 (): void {
    console.log(1)
    store.setAccessToken('')
    router.push({
      path: '/login'
    })
  }

  protected _getCommonOptions () {
    const token = store.accessToken
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
  }
}
