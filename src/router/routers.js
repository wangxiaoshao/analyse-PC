const Application = () => import('@src/views/application/index.vue') /* webpackChunkName: 'home' */
const ApplicationList = () => import('@src/views/application/ApplicationList/index.vue') /* webpackChunkName: 'home' */
const ApplicationConfig = () => import('@src/views/application/ApplicationConfig/index.vue') /* webpackChunkName: 'home' */


// 申请审核
const WaitApprovalList = () => import('@src/views/examine/WaitApprovalList/index.vue') /* webpackChunkName: 'home' */
const ExamineDetails = () => import('@src/views/examine/ExamineDetails/index.vue') /* webpackChunkName: 'home' */
const Approved = () => import('@src/views/examine/Approved/index.vue') /* webpackChunkName: 'home' */
const MyApplication = () => import('@src/views/examine/MyApplication/index.vue') /* webpackChunkName: 'home' */
const ConfirmInfo = () => import('@src/views/examine/ConfirmInfo/index.vue') /* webpackChunkName: 'home' */
// 统计管理
const DataStatistics = () => import('@src/views/statistics/DataStatistics/index.vue') /* webpackChunkName: 'home' */
const DataLog = () => import('@src/views/statistics/DataLog/index.vue') /* webpackChunkName: 'home' */
const DataQuery = () => import('@src/views/statistics/DataQuery/index.vue') /* webpackChunkName: 'home' */

const Organization = () => import('@src/views/organization/index.vue')
const OrganizationContent = () => import('@src/views/organization/organization-content/index.vue')
const NodeDetail = () => import('@src/views/organization/node-detail/index.vue')
const UnitDetail = () => import('@src/views/organization/unit-detail/index.vue')
const DepartmentDetail = () => import('@src/views/organization/department-detail/index.vue')
const PersonDetail = () => import('@src/views/organization/person-detail/index.vue')

const Shared = () => import('@src/views/shared/index.vue') /* webpackChunkName: 'home' */
const ViewManagement = () => import('@src/views/shared/view-management/index.vue')
const CreateView = () => import('@src/views/shared/create-view/index.vue')
const GroupManagement = () => import('@src/views/shared/group-management/index.vue')
const GroupDetail = () => import('@src/views/shared/group-detail/index.vue')
const AppManagement = () => import('@src/views/shared/app-management/index.vue')
const CreateAppManagement = () => import('@src/views/shared/create-app-management/index.vue')
const TagsManagement = () => import('@src/views/shared/tags-management/index.vue')
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
        path: 'nodeAdd/:parentId/:name',
        name: 'NodeAdd',
        component: NodeDetail
      }, {
        path: 'unitAdd/:parentId/:name',
        name: 'UnitAdd',
        component: UnitDetail
      }, {
        path: 'departmentAdd',
        name: 'DepartmentAdd',
        component: DepartmentDetail
      }, {
        path: 'personAdd',
        name: 'PersonAdd',
        component: PersonDetail
      }
    ]
  },



  // 申请审核 examine
  {
    path: '/approved',
    name: 'Approved',
    component: Approved
  },
  {
    path: '/waitApprovalList',
    name: 'WaitApprovalList',
    component: WaitApprovalList
  },
  {
    path: '/myApplication',
    name: 'MyApplication',
    component: MyApplication
  },
  {
    path: '/confirmInfo',
    name: 'ConfirmInfo',
    component: ConfirmInfo
  },
  {
    path: '/examineDetails',
    name: 'ExamineDetails',
    component: ExamineDetails
  },



  // 共享管理
  {
    path: '/shared',
    name: 'Shared',
    component: Shared,
    children: [
      {
        path: '/viewmanagement',
        name: 'ViewManagement',
        component: ViewManagement
      },
      {
        path: 'createview',
        name: 'CreateView',
        component: CreateView
      },
      {
        path: '/groupmanagement',
        name: 'GroupManagement',
        component: GroupManagement
      },
      {
        path: 'groupdetail',
        name: 'GroupDetail',
        component: GroupDetail
      },
      {
        path: '/appmanagement',
        name: 'AppManagement',
        component: AppManagement
      },
      {
        path: 'createappmanagement',
        name: 'CreateAppManagement',
        component: CreateAppManagement
      },
      {
        path: '/tagsmnagement',
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
    path: '/nodeDetail',
    name: 'NodeDetail',
    component: NodeDetail
  },
  // 单位详情
  {
    path: '/unitDetail',
    name: 'UnitDetail',
    component: UnitDetail
  },
  // 部门详情
  {
    path: '/departmentDetail',
    name: 'DepartmentDetail',
    component: DepartmentDetail
  },
  // 人员详情
  {
    path: '/personDetail',
    name: 'PersonDetail',
    component: PersonDetail
  },



// 统计管理

  {
    path: '/dataStatistics',
    name: 'DataStatistics',
    component: DataStatistics,
  },
  {
    path: '/dataQuery',
    name: 'DataQuery',
    component: DataQuery,
  },
  {
    path: '/dataLog',
    name: 'DataLog',
    component: DataLog,
  },
]

