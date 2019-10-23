const Application = () => import('@src/views/application/index.vue') /* webpackChunkName: 'home' */
const ApplicationList = () => import('@src/views/application/ApplicationList/index.vue') /* webpackChunkName: 'home' */
const ApplicationConfig = () => import('@src/views/application/ApplicationConfig/index.vue') /* webpackChunkName: 'home' */
const WaitApprovalList = () => import('@src/views/examine/WaitApprovalList/index.vue') /* webpackChunkName: 'home' */
const WaitApprovalItem = () => import('@src/views/examine/WaitApprovalItem/index.vue') /* webpackChunkName: 'home' */
const Approved = () => import('@src/views/examine/Approved/index.vue') /* webpackChunkName: 'home' */
const MyApplication = () => import('@src/views/examine/MyApplication/index.vue') /* webpackChunkName: 'home' */
const ConfirmInfo = () => import('@src/views/examine/ConfirmInfo/index.vue') /* webpackChunkName: 'home' */
const Log = () => import('@src/views/log/index.vue') /* webpackChunkName: 'home' */
const Statistics = () => import('@src/views/statistics/index.vue') /* webpackChunkName: 'home' */

const Organization = () => import('@src/views/organization/index.vue')
const OrganizationContent = () => import('@src/views/organization/organizationContent/index.vue')
const NodeDetail = () => import('@src/views/organization/NodeDetail/index.vue')
const UnitDetail = () => import('@src/views/organization/UnitDetail/index.vue')
const DepartmentDetail = () => import('@src/views/organization/DepartmentDetail/index.vue')
const PersonDetail = () => import('@src/views/organization/PersonDetail/index.vue')

const Shared = () => import('@src/views/shared/index.vue') /* webpackChunkName: 'home' */
const ViewManagement = () => import('@src/views/shared/ViewManagement/index.vue')
const CreateView = () => import('@src/views/shared/CreateView/index.vue')
const GroupManagement = () => import('@src/views/shared/GroupManagement/index.vue')
const GroupDetail = () => import('@src/views/shared/GroupDetail/index.vue')
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
        path: 'organizationContent/:id',
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
    path: '/waitApprovalItem',
    name: 'WaitApprovalItem',
    component: WaitApprovalItem
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
  // 日志统计

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
      }
    ]
  },
  // 参数配置
  {
    path: '/organizationDetail',
    name: 'organizationDetail',
    component: OrganizationContent
  },
  // 组织机构详情页
  {
    path: '/organizationDetail',
    name: 'organizationDetail',
    component: OrganizationContent
  },
  // 节点详情
  {
    path: '/nodeDetail',
    name: 'nodeDetail',
    component: NodeDetail
  },
  // 单位详情
  {
    path: '/unitDetail',
    name: 'unitDetail',
    component: UnitDetail
  },
  // 部门详情
  {
    path: '/departmentDetail',
    name: 'departmentDetail',
    component: DepartmentDetail
  },
  // 人员详情
  {
    path: '/personDetail',
    name: 'personDetail',
    component: PersonDetail
  }
]
