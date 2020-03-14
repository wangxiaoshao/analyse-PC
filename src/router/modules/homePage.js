const HomePage = () => import('@src/views/homePage/index.vue')
const MoreAnnoument = () => import('@src/views/moreAnnoument/index.vue')
const AnnounceDetail = () => import('@src/views/moreAnnoument/announceDetail/index.vue')
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
  }
]
