const Application = () => import('@src/views/application/index.vue')
const ApplicationList = () => import('@src/views/application/ApplicationList/index.vue')
const ApplicationConfig = () => import('@src/views/application/ApplicationConfig/index.vue')


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
// 统计管理
const DataStatistics = () => import('@src/views/statistics/data-statistics/index.vue')
const DataLog = () => import('@src/views/statistics/data-log/index.vue')
const DataQuery = () => import('@src/views/statistics/data-query/index.vue')
const UnitQuery = () => import('@src/views/statistics/data-query/unit-query/index.vue')
const DepartmentQuery = () => import('@src/views/statistics/data-query/department-query/index.vue')
const MemberQuery = () => import('@src/views/statistics/data-query/member-query/index.vue')

const Organization = () => import('@src/views/organization/index.vue')
const OrganizationContent = () => import('@src/views/organization/organization-content/index.vue')
const NodeDetail = () => import('@src/views/organization/node-detail/index.vue')
const UnitDetail = () => import('@src/views/organization/unit-detail/index.vue')
const DepartmentDetail = () => import('@src/views/organization/department-detail/index.vue')
const PersonDetail = () => import('@src/views/organization/person-detail/index.vue')

const Shared = () => import('@src/views/shared/index.vue')
const ViewManagement = () => import('@src/views/shared/view-management/index.vue')
const CreateView = () => import('@src/views/shared/create-view/index.vue')
const GroupManagement = () => import('@src/views/shared/group-management/index.vue')
const GroupDetail = () => import('@src/views/shared/group-detail/index.vue')
const AppManagement = () => import('@src/views/shared/app-management/index.vue')
const CreateAppManagement = () => import('@src/views/shared/create-app-management/index.vue')
const TagsManagement = () => import('@src/views/shared/tags-management/index.vue')
/* 权限管理 */
const RightsManagement = () => import('@src/views/shared/rights-management/index.vue')


/* 系统设置 */
const SystemSetting = () => import('@src/views/system-setting/index.vue')
const ParameterSetting = () => import('@src/views/system-setting/parameter-setting/index.vue')
// 字典管理
const DictionaryManage = () => import('@src/views/system-setting/dictionary-manage/index.vue')
/* 路由 */
export default [
  {
    path: '/',
    name: 'default',
    redirect: '/organization'
  },
  {
    path: '/application',
    name: 'Application',
    component: Application,
    children: [
      {
        path: '/',
        name: 'ApplicationList',
        component: ApplicationList
      },
      {
        path: 'config/:id',
        name: 'ApplicationConfig',
        component: ApplicationConfig
      }
    ]
  },
  // 组织机构管理
  {
    path: '/organization',
    name: 'Organization',
    component: Organization,
    children: [
      {
        path: 'organization-content/:nodeId',
        name: 'OrganizationContent',
        component: OrganizationContent
      }, {
        path: 'nodeEdit/:id',
        name: 'NodeEdit',
        component: NodeDetail
      }, {
        path: 'unitEdit/:id',
        name: 'UnitEdit',
        component: UnitDetail
      }, {
        path: 'departmentEdit/:id',
        name: 'DepartmentEdit',
        component: DepartmentDetail
      }, {
        path: 'personEdit/:id',
        name: 'PersonEdit',
        component: PersonDetail
      }, {
        path: 'nodeAdd/:parentId',
        name: 'NodeAdd',
        component: NodeDetail
      }, {
        path: 'unitAdd/:parentId',
        name: 'UnitAdd',
        component: UnitDetail
      }, {
        path: 'departmentAdd/:parentId',
        name: 'DepartmentAdd',
        component: DepartmentDetail
      }, {
        path: 'personAdd/:parentId',
        name: 'PersonAdd',
        component: PersonDetail
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
    component: ConfirmInfo
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
  // 组织机构详情页
  {
    path: '/organizationDetail',
    name: 'OrganizationDetail',
    component: OrganizationContent
  },
  // 节点详情
  {
    path: '/nodeDetail/:id',
    name: 'NodeDetail',
    component: NodeDetail
  },
  // 单位详情
  {
    path: '/unitDetail/:id',
    name: 'UnitDetail',
    component: UnitDetail
  },
  // 部门详情
  {
    path: '/departmentDetail/:id',
    name: 'DepartmentDetail',
    component: DepartmentDetail
  },
  // 人员详情
  {
    path: '/personDetail/:id',
    name: 'PersonDetail',
    component: PersonDetail
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
        path: '/parameter-setting',
        name: 'ParameterSetting',
        component: ParameterSetting
      },
      {
        path: '/dictionary-manage',
        name: 'DictionaryManage',
        component: DictionaryManage
      }
    ]
  }
]

