/**
 * Created by luoxie on 2019-07-17.
 */

// 后端服务配置
const Serve = {
  development: {
    organizationManagePC: '' // 没有配置mock数据，默认发送的服务器
  },
  test: {
    organizationManagePC: ''
    // organizationManagePC: 'http://jg-dev.lonmo.com'
  },
  production: {
    organizationManagePC: ''
  }
}

// 环境配置
let prefix = ''
let host = window.location.host

if (process.env.NODE_ENV === 'development') {
  prefix = Serve.development
} else if (process.env.NODE_ENV === 'test') {
  prefix = Serve.test
} else {
  if (host.includes('jg-dev.lonmo.com')) {
    // 测试环境
    prefix = Serve.test
  } else {
    // 正式环境
    prefix = Serve.production
  }
}
export const urlPrefix = prefix

