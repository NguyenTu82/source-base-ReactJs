import lodash from 'lodash'
import { toast } from 'react-toastify'
import LocalStorage from './storage'

let requests = 0
let interceptors = {}
let accessToken = null

function triggerInterceptors(event, data = {}) {
  lodash.forEach(interceptors, (interceptor) => {
    interceptor(event, data)
  })
}

class Request {
  static create(options) {
    return new Request(options)
  }

  static registerInterceptor(name, interceptor) {
    interceptors[name] = interceptor
  }

  static unregisterInterceptor(name) {
    interceptors = lodash.omit(interceptors, name)
  }

  static setAccessToken(token) {
    accessToken = token
  }

  static getAccessToken() {
    return accessToken
  }

  static removeAccessToken() {
    accessToken = null
  }

  constructor(options) {
    this._options = options
  }

  get(url, params, headers) {
    return this.request({ method: 'GET', url, params, headers })
  }

  post(url, data, params, headers) {
    return this.request({ method: 'POST', url, params, data, headers })
  }

  put(url, data, params, headers) {
    return this.request({ method: 'PUT', url, params, data, headers })
  }

  delete(url, data, params, headers) {
    return this.request({ method: 'DELETE', url, params, data, headers })
  }

  async request(...args) {
    requests += 1

    triggerInterceptors('request:start', { requests })

    try {
      return await this._request(...args)
    } finally {
      triggerInterceptors('request:done', { requests })

      requests -= 1
    }
  }

  async _request(requestOptions) {
    const { method = 'GET', data = null, headers } = requestOptions
    let { url, params = null } = requestOptions

    url = this._options.endpoint + url

    if (this._options.handleToken && accessToken) {
      this._authorization = `Bearer ${accessToken}`
    }

    if (params) {
      url += this._getQueryString(params)
    }

    const options = {
      method,
      headers: {}
    }

    if (this._authorization) {
      options.headers.Authorization = this._authorization
    }

    if (this._options.apiKey) {
      options.headers.ApiKey = this._options.apiKey
    }

    options.headers = lodash.merge(options.headers, headers)

    if (['POST', 'PUT', 'DELETE'].includes(method)) {
      if (data) {
        const serializable = lodash.isPlainObject(data) || lodash.isArray(data)

        options.body = serializable ? JSON.stringify(data) : data

        let contentType = null

        if (serializable) {
          contentType = 'application/json'
        }

        if (contentType) {
          options.headers['Content-Type'] = contentType
        }
      }
    }

    const res = await fetch(url, options)

    if (!res.ok) {
      triggerInterceptors('response:error', { response: res })
      throw res
    }

    const text = await res.text()

    try {
      const result = text !== '' ? JSON.parse(text) : ''
      if (!result?.success) {
        const { error } = result
        if (
          [
            'NOT_AUTHENTICATED_ERROR',
            'USER_NOT_FOUND',
            'USER_HAS_BEEN_LOCKED'
          ].includes(error?.code)) {
          LocalStorage.remove('ACCESS_TOKEN')
          LocalStorage.clear()
          Request.removeAccessToken()
        }

        toast.error(error?.code?.replaceAll('_', ' '))
      }
      return result
    } catch (error) {
      triggerInterceptors('response:error.json', { error, response: res })
      /* eslint-disable no-console */
      console.error('[request] parse JSON response error:', method, url, data, params, text, error)
      throw error
    }
  }

  _getQueryString(params) {
    const parts = []

    lodash.forEach(params, (value, key) => {
      const values = lodash.isArray(value) ? value : [value]
      const operator = lodash.isArray(value) ? '[]=' : '='

      lodash.forEach(values, (v) => {
        parts.push(key + operator + encodeURIComponent(v))
      })
    })

    const queryString = parts.join('&')

    return queryString ? `?${queryString}` : ''
  }
}

export default Request
