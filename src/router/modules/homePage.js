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
    component: MoreAnnoument
  },
  {
    path: '/announceDetail',
    name: 'AnnounceDetail',
    component: AnnounceDetail
  }
]
