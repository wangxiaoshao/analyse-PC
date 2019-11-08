
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
  }
]

