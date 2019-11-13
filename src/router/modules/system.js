// 角色权限
const RoleManage = () => import('@src/views/role-manage/index.vue')
const RoleList = () => import('@src/views/role-manage/role-list/index.vue')
const lookPersonPermission = () => import('@src/views/role-manage/look-person-permission/index.vue')
// 字典管理
const DictionaryManage = () => import('@src/views/system-setting/dictionary-manage/index.vue')
// 系统设置
const SystemSetting = () => import('@src/views/system-setting/index.vue')
// 权限配置
const RightsManagement = () => import('@src/views/shared/rights-management/index.vue')
// 参数配置
const ParameterSetting = () => import('@src/views/system-setting/parameter-setting/index.vue')
export default [
  // 权限管理
  {
    path: '/rights-management',
    name: 'RightsManagement',
    component: RightsManagement
  },
  // 角色管理
  {
    path: '/role-manage',
    name: 'RoleManage',
    component: RoleManage,
    children: [
      {
        path: '',
        name: 'RoleList',
        component: RoleList
      },
      {
        path: 'look-person-permission/:id',
        name: 'lookPersonPermission',
        component: lookPersonPermission
      }
    ]
  },
  // 系统设置
  {
    path: '/system-setting',
    name: 'SystemSetting',
    component: SystemSetting,
    children: [
      {
        path: '/dictionary-manage',
        name: 'DictionaryManage',
        component: DictionaryManage
      },
      {
        path: '/parameter-setting',
        name: 'ParameterSettings',
        component: ParameterSetting
      }
    ]
  }
]

