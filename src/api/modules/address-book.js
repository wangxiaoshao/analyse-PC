import urlNames from '../url-names'
export default {
  /**
     * 获取通讯录列表
     */
  [urlNames.getAddressBookList]: {
    type: 'get', // 请求类型
    url: '/api/jg_txl/txl/departmentTxl', // 请求地址
    keepOriginResponse: true, // 返回数据是否保留后端response数据格式
    serve: 'organizationManagePC' // 该请求对应服务端，服务端名字在url-prefix中配置
    // mock: '/getUserInfo.json' // development模式下，本地mock数据地址
  }
}
