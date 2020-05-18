const HomePage = () => import('@src/views/homePage/index.vue')
const MoreAnnoument = () => import('@src/views/moreAnnoument/index.vue')
const AnnounceDetail = () => import('@src/views/moreAnnoument/announceDetail/index.vue')
// 通知中心
const Notification = () => import('@src/views/notification/index.vue')

export default [
  {
    path: '/homePage',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/moreAnnoument',
    name: 'MoreAnnoument',
    component: MoreAnnoument,
    meta: {
      breadcrumb: [{ name: '平台公告' }]
    }
  },
  {
    path: '/announceDetail',
    name: 'AnnounceDetail',
    component: AnnounceDetail,
    meta: {
      breadcrumb: [{ name: '文章详情' }]
    }
  },
  {
    path: '/notification',
    name: 'notification',
    component: Notification,
    meta: {
      breadcrumb: [{ name: '通知中心' }]
    }
  }

]
