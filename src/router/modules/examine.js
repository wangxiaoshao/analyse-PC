
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

const WaitApprovalUnitDetail = () => import('@src/views/organization/unit-detail/index.vue')
const WaitApprovalPersonDetail = () => import('@src/views/organization/person-detail/index.vue')
const WaitApprovalDepartmentDetail = () => import('@src/views/organization/department-detail/index.vue')

const ApprovedUnitDetail = () => import('@src/views/organization/unit-detail/index.vue')
const ApprovedPersonDetail = () => import('@src/views/organization/person-detail/index.vue')
const ApprovedDepartmentDetail = () => import('@src/views/organization/department-detail/index.vue')

const MyApplicationUnitDetail = () => import('@src/views/organization/unit-detail/index.vue')
const MyApplicationPersonDetail = () => import('@src/views/organization/person-detail/index.vue')
const MyApplicationDepartmentDetail = () => import('@src/views/organization/department-detail/index.vue')


export default [
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
        path: 'detail/:type/:id',
        name: 'WaitApprovalDetail',
        meta: { prePath: 'wait-approval' },
        component: WaitApprovalDetail
      },
      // 单位详情
      {
        path: 'unitDetail/:id',
        name: 'WaitApprovalUnitDetail',
        component: WaitApprovalUnitDetail
      },
      // 人员详情
      {
        path: 'personDetail/:id',
        name: 'WaitApprovalPersonDetail',
        component: WaitApprovalPersonDetail
      },
      // 部门详情
      {
        path: 'departmentDetail/:id',
        name: 'WaitApprovalDepartmentDetail',
        component: WaitApprovalDepartmentDetail
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
        path: 'detail/:type/:id',
        name: 'ApprovedDetail',
        meta: { prePath: 'approved' },
        component: ApprovedDetail
      },
      // 单位详情
      {
        path: 'unitDetail/:id',
        name: 'ApprovedUnitDetail',
        component: ApprovedUnitDetail
      },
      // 人员详情
      {
        path: 'personDetail/:id',
        name: 'ApprovedPersonDetail',
        component: ApprovedPersonDetail
      },
      // 部门详情
      {
        path: 'departmentDetail/:id',
        name: 'ApprovedDepartmentDetail',
        component: ApprovedDepartmentDetail
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
        path: 'detail/:type/:id',
        name: 'MyApplicationDetail',
        meta: { prePath: 'my-application' },
        component: MyApplicationDetail
      },
      // 单位详情
      {
        path: 'unitDetail/:id',
        name: 'MyApplicationUnitDetail',
        component: MyApplicationUnitDetail
      },
      // 人员详情
      {
        path: 'personDetail/:id',
        name: 'MyApplicationPersonDetail',
        component: MyApplicationPersonDetail
      },
      // 部门详情
      {
        path: 'departmentDetail/:id',
        name: 'MyApplicationDepartmentDetail',
        component: MyApplicationDepartmentDetail
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
        path: 'detail/:month/:id',
        name: 'ConfirmInfoDetail',
        component: ConfirmInfoDetail
      }
    ]
  }
]

