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
    message: resp.data.message,
    messageCode: 'NETWORK_FAILED',
    status: resp.status,
    statusText: resp.statusText,
    error: resp.data.error
  }
}
/**
 * start: 封装http interceptor loading
 */
let needLoadingRequestCount = 0
let globalLoading = null
const startLoading = (tip) => {
  globalLoading = Loading.service({
    fullscreen: true,
    // background: "rgba(0,0,0,0.45)",
    text: tip
  })
}

const endLoading = () => {
  // 以服务的方式调用的 Loading 需要异步关闭
  setTimeout(() => {
    globalLoading.close()
  }, 0)
}

const showGlobalLoading = (tip) => {
  if (needLoadingRequestCount === 0) {
    startLoading(tip)
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

axios.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    Message.error({ message: '请求超时!' })
    return Promise.resolve(err)
  }
)

// 发送请求之前，对参数操作，比如修改header
axios.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers
    }
    config.url = urlPrefix[config.serve] + config.url
    // 显示loading
    if (config.showLoading) {
      showGlobalLoading(config.text)
    }
    return config
  },
  (err) => {
    Message.error('请求超时')
    return Promise.resolve(err)
  }
)

let loginMessageBox = null
const appLogin = () => {
  if (!loginMessageBox) {
    loginMessageBox = MessageBox.alert(
      '用户信息失效，请重新登录',
      '登录过期',
      {
        showClose: false,
        confirmButtonText: '确定',
        callback: (action) => {}
      }
    )
  }
}
function dowloadFile (response) {
  // console.log(response, "ddddddddddd");
  const headers = response.headers
  const title = window.decodeURI(headers['content-disposition'].split('=')[1])
  // console.log(title, "title");
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    const blob = new Blob([response.data])
    window.navigator.msSaveOrOpenBlob(blob, `${title}`)
  } else {
    const blob = new Blob([response.data], { type: headers['Content-Type'] })
    const downloadElement = document.createElement('a')
    const href = window.URL.createObjectURL(blob)
    downloadElement.href = href
    downloadElement.download = `${title}`
    document.body.appendChild(downloadElement)
    downloadElement.click()
    document.body.removeChild(downloadElement)
    window.URL.revokeObjectURL(href)
  }
}
// response interceptor
axios.interceptors.response.use(
  (response) => {
    const { config, data } = response
    const contentType = response.headers['content-type'] || ''
    const responseType = response.config.headers['Response-Type'] || ''
    const jsonLikeReg = /^application\/json/i

    // 判断单点登录未登录状态
    //
    if (
      typeof data === 'string' &&
            data.includes('<!DOCTYPE html PUBLIC ')
    ) {
      const reg = /^.+\/cas\/login\/?\?service=/
      const match =
                reg.exec(response.request.responseURL) !== undefined
                  ? reg.exec(response.request.responseURL)
                  : null
      if (match) {
        // window.location.href = match[0] + window.location.href;
        // TODO 后端单点登录有问题，临时跳转到后端的接口
        window.location.href = `${match[0]}${location.protocol}//${window.location.host}/api/gate/forward`
        return { status: -1, message: '未登录' }
      } else {
        window.location.href = `http://cas.gz.cegn.cn/cas/login?service=http://${window.location.host}/api/gate/forward`
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
        if (
          data.status === 0 ||
                    data.status === 200 ||
                    data.error === 0
        ) {
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
    } else if (responseType) {
      // return Promise.resolve(response.data)文件下载
      dowloadFile(response)
    } else {
      Message({
        message: data.message || '服务器异常1，请稍后重试',
        showClose: true,
        type: 'error'
      })
      return Promise.reject(response)
    }
  },
  ({ config, response }) => {
    // 尝试关闭loading
    if (config.showLoading) {
      tryHideGlobalLoading()
    }
    const error = wrapperHttpException(response)
    if (!config.ignore) {
      Message({
        showClose: !/^(16)/.test(response.data.error),
        message: error.message || '网络异常，请稍后重试',
        type: /^(16)/.test(response.data.error) ? 'warning' : 'error' // 签名验证开关统一处理提示类型
      })
    }
    return Promise.reject(error)
  }
)

export default axios
