/**
 * Created by luoxie on 2019-07-17.
 */
import axios from 'axios'
import { Loading, Message, MessageBox } from 'element-ui'
import { urlPrefix } from './url-prefix'

/**
 * 封装http异常
 * @param {object} resp - axios抛出的对象
 * @return {{messageCode: string, message: string}}
 */
function wrapperHttpException (resp) {
  return {
    message: '服务繁忙，请稍后再试',
    messageCode: 'NETWORK_FAILED',
    status: resp.status,
    statusText: resp.statusText
  }
}
/**
 * start: 封装http interceptor loading
 */
let needLoadingRequestCount = 0
let globalLoading = null
const startLoading = () => {
  globalLoading = Loading.service({
    fullscreen: true,
    background: 'rgba(0,0,0,0.45)'
  })
}

const endLoading = () => {
  // 以服务的方式调用的 Loading 需要异步关闭
  setTimeout(() => {
    globalLoading.close()
  }, 0)
}

const showGlobalLoading = () => {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

const tryHideGlobalLoading = () => {
  if (needLoadingRequestCount <= 0) {
    return
  }
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
/**
 * end: 封装http interceptor loading
 */

axios.interceptors.request.use(config => {
  return config
}, err => {
  Message.error({ message: '请求超时!' })
  return Promise.resolve(err)
})

// 发送请求之前，对参数操作，比如修改header
axios.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers
  }
  if (process.env.NODE_ENV === 'development' && config.mock) {
    config.url = config.mock
    config.method = 'get'
  } else {
    config.url = urlPrefix[config.serve] + config.url
  }
  // 显示loading
  if (config.showLoading) {
    showGlobalLoading()
  }
  return config
}, err => {
  Message.error('请求超时')
  return Promise.resolve(err)
})

let loginMessageBox = null
const appLogin = () => {
  if (!loginMessageBox) {
    loginMessageBox = MessageBox.alert('用户信息失效，请重新登录', '登录过期', {
      showClose: false,
      confirmButtonText: '确定',
      callback: action => {}
    })
  }
}
// response interceptor
axios.interceptors.response.use((response) => {
  const { config, data } = response
  const contentType = response.headers['content-type'] || ''
  const jsonLikeReg = /^application\/json/i

  // 判断单点登录未登录状态
  if (typeof data === 'string' && response.request.responseURL.includes('/cas/login')) {
    const reg = /^.+\/cas\/login\/?\?service=/
    const match = reg.exec(response.request.responseURL)
    if (match) {
      window.location.href = match[0] + window.location.href
      return { status: -1, message: '未登录' }
    }
  }

  // 尝试关闭loading
  if (config.showLoading) {
    tryHideGlobalLoading()
  }

  // 如果是json
  if (jsonLikeReg.test(contentType)) {
    if (config.keepOriginResponse) {
      return Promise.resolve(response.data)
    } else {
      if (data.error === 0 || data.error === 200 || data.status === 200) {
        return Promise.resolve(response.data)
      } else if (data.error === 403) {
        appLogin()
      } else {
        Message({
          message: data.message || '服务器异常，请稍后重试',
          showClose: true,
          type: 'error'
        })
        return Promise.reject(response)
      }
    }
  } else {
    Message({
      message: data.message || '服务器异常，请稍后重试',
      showClose: true,
      type: 'error'
    })
    return Promise.reject(response)
  }
}, ({ config, response }) => {
  // 尝试关闭loading
  if (config.showLoading) {
    tryHideGlobalLoading()
  }
  const error = wrapperHttpException(response)
  if (!config.ignore) {
    Message({
      showClose: true,
      message: error.message || '网络异常，请稍后重试',
      type: 'error'
    })
  }
  return Promise.reject(error)
})

export default axios
