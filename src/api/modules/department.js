/**
 * Created by luoxie on 2019-07-16.
 */
import urlNames from '../url-names'

export default {
  /**
   * 获取内设机构/子内设机构列表
   */
  [urlNames.getDepartmentList]: {
    type: 'get',
    url: '/api/converter/queryOrgDataTree',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC'
  },
  /**
   * 获取内设机构人员列表
   */
  [urlNames.getDepartmentMemberList]: {
    type: 'get',
    url: '/api/converter/deptuser_list',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC'
  },
  /*
   * 获取组织人员列表
   */
  [urlNames.getOrganizationMemberList]: {
    type: 'get',
    url: '/api/converter/user_list',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC'
  },
  /*
   * 获取组织人员列表
   */
  [urlNames.addDepartment]: {
    type: 'post',
    url: '/api/converter/add_department',
    headers: {
      'Content-Type': 'application/json'
    },
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC'
  },
  /*
   * 获取组织人员列表
   */
  [urlNames.addMember]: {
    type: 'post',
    url: '/api/converter/add_user',
    headers: {
      'Content-Type': 'application/json'
    },
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC'
  },
  /**
   * 获取单位信息
   */
  [urlNames.getOrganizationInfo]: {
    type: 'get',
    url: '/api/converter/orgdata',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC'
  },
  /*
   * 获取职务列表
   */
  [urlNames.getDutyNameList]: {
    type: 'get',
    url: '/api/converter/add_department',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC'
  },
  /*
   * 获取职务级别列表
   */
  [urlNames.getDutyLevelList]: {
    type: 'get',
    url: '/api/converter/getParamAllData',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC'
  },
  /*
   * 获取职务列表
   */
  [urlNames.getDutyNameList]: {
    type: 'get',
    url: '/api/converter/getDutyInfo',
    keepOriginResponse: true,
    showLoading: true,
    serve: 'organizationManagePC'
  }
}
