
const DataStatistics = () => import('@src/views/statistics/data-statistics/index.vue')
const DataLog = () => import('@src/views/statistics/data-log/index.vue')
const UnitQuery = () => import('@src/views/statistics/data-query/unit-query/index.vue')
const DepartmentQuery = () => import('@src/views/statistics/data-query/department-query/index.vue')
const MemberQuery = () => import('@src/views/statistics/data-query/member-query/index.vue')


export default [
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
  }
]

