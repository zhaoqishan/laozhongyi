import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import mpAdapter from 'axios-miniprogram-adapter'
axios.defaults.adapter = mpAdapter
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: 'http://localhost:21021/api/services/app',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response
    // if the custom code is not 20000, it is judged as an error.
    if ((res.code !== 20000 && res.status !== 200) || typeof res.data.error !== 'undefined') {
      Message({
        message: res.message || res.error.message || res.data.error || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            window.location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || res.error.message || res.data.error || 'Error'))
    } else {
      // return isNullOrUndefined(res.data.result) ? JSON.parse(res.data).result : res.data.result
      return res.data.result
    }
  },
  error => {
    // console.log('err:' + JSON.stringify(error.response.data.error.message)) // for debug
    Message({
      message: error.response.data.error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error.response.data.error.message)
  }
)

export default service
