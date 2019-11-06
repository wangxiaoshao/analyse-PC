import organization from './modules/organization'

// 申请审核
const WaitApproval = () => import('@src/views/wait-approval/index.vue')
const WaitApprovalList = () => import('@src/views/wait-approval/WaitApprovalList/index.vue')
const WaitApprovalDetail = () => import('@src/views/wait-approval/WaitApprovalDetail/index.vue')
const Approved = () => import('@src/views/approved/index.vue')
const ApprovedList = () => import('@src/views/approved/ApprovedList/index.vue')
const ApprovedDetail = () => import('@src/views/approved/ApprovedDetail/index.vue')
const MyApplication = () => import('@src/views/my-application/index.vue')
const MyApplicationList = () => import('@src/views/my-application/MyApplicationList/index.vue')
const MyApplicationDetail = () => import('@src/views/my-application/MyApplicationDetail/index.vue')
const ConfirmInfo = () => import('@src/views/confirm-info/index.vue')
const ConfirmInfoList = () => import('@src/views/confirm-info/ConfirmInfoList/index.vue')
const ConfirmInfoDetail = () => import('@src/views/confirm-info/ConfirmInfoDetail/index.vue')
// 统计管理
const DataStatistics = () => import('@src/views/statistics/data-statistics/index.vue')
const DataLog = () => import('@src/views/statistics/data-log/index.vue')
const DataQuery = () => import('@src/views/statistics/data-query/index.vue')
const UnitQuery = () => import('@src/views/statistics/data-query/unit-query/index.vue')
const DepartmentQuery = () => import('@src/views/statistics/data-query/department-query/index.vue')
const MemberQuery = () => import('@src/views/statistics/data-query/member-query/index.vue')

const Shared = () => import('@src/views/shared/index.vue')
const ViewManagement = () => import('@src/views/shared/view-management/index.vue')
const CreateView = () => import('@src/views/shared/create-view/index.vue')
const GroupManagement = () => import('@src/views/shared/group-management/index.vue')
const GroupDetail = () => import('@src/views/shared/group-detail/index.vue')
const AppManagement = () => import('@src/views/shared/app-management/index.vue')
const CreateAppManagement = () => import('@src/views/shared/create-app-management/index.vue')
const TagsManagement = () => import('@src/views/shared/tags-management/index.vue')


/* 系统设置 */
const SystemSetting = () => import('@src/views/system-setting/index.vue')
const ParameterSetting = () => import('@src/views/system-setting/parameter-setting/index.vue')

/* 角色权限 */
const RoleManage = () => import('@src/views/role-manage/index.vue')
const RoleList = () => import('@src/views/role-manage/role-list/index.vue')
const lookPersonPermission = () => import('@src/views/role-manage/look-person-permission/index.vue')
/* 权限配置 */
const RightsManagement = () => import('@src/views/shared/rights-management/index.vue')

// 字典管理
const DictionaryManage = () => import('@src/views/system-setting/dictionary-manage/index.vue')
/* 路由 */
export default [
  ...organization,
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
  /*
  申请审核（包含 待我审核、我已审核、我的申请、信息确认）
  * */
  { // 待我审核
    path: '/wait-approval',
    name: 'WaitApproval',
    component: WaitApproval,
    children: [
      {
        path: '/',
        name: 'WaitApprovalList',
        component: WaitApprovalList
      },
      {
        path: 'detail',
        name: 'WaitApprovalDetail',
        component: WaitApprovalDetail
      }
    ]

  },
  { // 我已审核
    path: '/approved',
    name: 'Approved',
    component: Approved,
    children: [
      {
        path: '/',
        name: 'ApprovedList',
        component: ApprovedList
      },
      {
        path: 'detail',
        name: 'ApprovedDetail',
        component: ApprovedDetail
      }
    ]
  },
  { // 我的申请
    path: '/my-application',
    name: 'MyApplication',
    component: MyApplication,
    children: [
      {
        path: '/',
        name: 'MyApplicationList',
        component: MyApplicationList
      },
      {
        path: 'detail',
        name: 'MyApplicationDetail',
        component: MyApplicationDetail
      }
    ]
  },
  { // 信息确认
    path: '/confirm-info',
    name: 'ConfirmInfo',
    component: ConfirmInfo,
    children: [
      {
        path: '/',
        name: 'ConfirmInfoList',
        component: ConfirmInfoList
      },
      {
        path: 'detail',
        name: 'ConfirmInfoDetail',
        component: ConfirmInfoDetail
      }
    ]
  },


  // 共享管理
  {
    path: '/shared',
    name: 'Shared',
    component: Shared,
    children: [
      {
        path: '/view-management',
        name: 'ViewManagement',
        component: ViewManagement
      },
      {
        path: '/view-management/create-view',
        name: 'CreateView',
        component: CreateView
      },
      {
        path: '/group-management',
        name: 'GroupManagement',
        component: GroupManagement
      },
      {
        path: '/group-management/group-detail',
        name: 'GroupDetail',
        component: GroupDetail
      },
      {
        path: '/app-management',
        name: 'AppManagement',
        component: AppManagement
      },
      {
        path: '/app-management/create-app-management',
        name: 'CreateAppManagement',
        component: CreateAppManagement
      },
      {
        path: '/tags-mnagement',
        name: 'TagsManagement',
        component: TagsManagement
      }
    ]
  },
  // 权限管理
  {
    path: '/rights-management',
    name: 'RightsManagement',
    component: RightsManagement
  },

  /*
  统计管理 （包含 数据统计、单位查询、部门查询、人员查询、系统日志）
  * */
  { // 数据统计
    path: '/data-statistics',
    name: 'DataStatistics',
    component: DataStatistics
  },
  { // 单位查询
    path: '/unit-query',
    name: 'UnitQuery',
    component: UnitQuery
  },
  { // 部门查询
    path: '/department-query',
    name: 'DepartmentQuery',
    component: DepartmentQuery
  },
  { // 人员查询
    path: '/member-query',
    name: 'MemberQuery',
    component: MemberQuery
  },
  { // 系统日志
    path: '/data-log',
    name: 'DataLog',
    component: DataLog
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
      }
    ]
  }
]

