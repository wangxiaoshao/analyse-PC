
const Shared = () => import('@src/views/shared/index.vue')
const ViewManagement = () => import('@src/views/shared/view-management/index.vue')
const CreateView = () => import('@src/views/shared/create-view/index.vue')
const GroupManagement = () => import('@src/views/shared/group-management/index.vue')
const GroupDetail = () => import('@src/views/shared/group-detail/index.vue')
const AppManagement = () => import('@src/views/shared/app-management/index.vue')
const CreateAppManagement = () => import('@src/views/shared/create-app-management/index.vue')
const TagsManagement = () => import('@src/views/shared/tags-management/index.vue')
const FieldsManagement = () => import('@src/views/shared/fields-management/index.vue')

export default [
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
        path: '/view-management/create-view/:id',
        name: 'CreateView',
        component: CreateView
      },
      {
        path: '/group-management',
        name: 'GroupManagement',
        component: GroupManagement
      },
      {
        path: '/group-management/group-detail/:id/:type',
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
        path: '/app-management/fields-management',
        name: 'FieldsManagement',
        component: FieldsManagement
      },
      {
        path: '/tags-mnagement',
        name: 'TagsManagement',
        component: TagsManagement
      }
    ]
  }
]

