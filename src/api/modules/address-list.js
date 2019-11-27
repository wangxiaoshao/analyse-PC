import urlNames from '../url-names'

/**
   * 获取通讯录数据
*/
export default{
    [urlNames.getAddressListTree]: {
        type: 'get',
        url: '/api/jg_txl/addressList/showOrgChild',
        keepOriginResponse: true, // 是否保留后端返回数据格式
        serve: 'organizationManagePC',
        mock: '/showOrgChild.json' 
      },

    /**通讯录单位下成员 */
    [urlNames.getAddressListOrganizationMembers]: {
        type: 'get', // 请求类型
        url: '/api/jg_txl/addressList/findOrganizationMembersAddressList', // 请求地址
        keepOriginResponse: true, // 返回数据是否保留后端response数据格式
        serve: 'organizationManagePC', // 该请求对应服务端，服务端名字在url-prefix中配置
        mock: '/address-book/addressBookList.json' // development模式下，本地mock数据地址
    },
    
    /**通讯录部门下成员 */
    [urlNames.getAddressListDepartmentMembers]: {
        type: 'get', // 请求类型
        url: '/api/jg_txl/addressList/findDepartmentMembersAddressList', // 请求地址
        keepOriginResponse: true, // 返回数据是否保留后端response数据格式
        serve: 'organizationManagePC', // 该请求对应服务端，服务端名字在url-prefix中配置
        mock: '/address-book/addressBookList.json' // development模式下，本地mock数据地址
        },
}