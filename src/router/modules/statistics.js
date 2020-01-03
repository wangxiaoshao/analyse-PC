
const DataStatistics = () => import('@src/views/statistics/data-statistics/index.vue')
const DataLog = () => import('@src/views/statistics/data-log/index.vue')

const UnitQuery = () => import('@src/views/unit-query/index.vue')
const UnitQueryList = () => import('@src/views/unit-query/UnitQueryList/index.vue')

const DepartmentQuery = () => import('@src/views/department-query/index.vue')
const DepartmentQueryList = () => import('@src/views/department-query/DepartmentQueryList/index.vue')

const MemberQuery = () => import('@src/views/member-query/index.vue')
const MemberQueryList = () => import('@src/views/member-query/MemberQueryList/index.vue')

const QueryUnitDetail = () => import('@src/views/organization/unit-detail/index.vue')
const QueryPersonDetail = () => import('@src/views/organization/person-detail/index.vue')
const QueryDepartmentDetail = () => import('@src/views/organization/department-detail/index.vue')


export default [
  { // 数据统计
    path: '/data-statistics',
    name: 'DataStatistics',
    component: DataStatistics,
    meta: {
      key: 'menuStatisticsData'
    }
  },
  { // 单位查询
    path: '/unit-query',
    name: 'UnitQuery',
    component: UnitQuery,
    meta: {
      key: 'menuSearchOrg'
    },
    children: [
      {
        path: '/',
        name: 'UnitQueryList',
        meta: { prePath: 'unit-query' },
        component: UnitQueryList
      },
      // 单位详情
      {
        path: 'unitDetail/:id',
        name: 'QueryUnitDetail',
        component: QueryUnitDetail
      }
    ]
  },
  { // 部门查询
    path: '/department-query',
    name: 'DepartmentQuery',
    component: DepartmentQuery,
    meta: {
      key: 'menuSearchDepartment'
    },
    children: [
      {
        path: '/',
        name: 'DepartmentQueryList',
        meta: { prePath: 'department-query' },
        component: DepartmentQueryList
      },
      // 部门详情
      {
        path: 'departmentDetail/:id',
        name: 'QueryDepartmentDetail',
        component: QueryDepartmentDetail
      }
    ]
  },
  { // 人员查询
    path: '/member-query',
    name: 'MemberQuery',
    component: MemberQuery,
    meta: {
      key: 'menuSearchUser'
    },
    children: [
      {
        path: '/',
        name: 'MemberQueryList',
        meta: { prePath: 'member-query' },
        component: MemberQueryList
      },
      // 人员详情
      {
        path: 'personDetail/:id/:identityId',
        name: 'QueryPersonDetail',
        component: QueryPersonDetail
      }
    ]
  },
  { // 系统日志
    path: '/data-log',
    name: 'DataLog',
    component: DataLog,
    meta: {
      key: 'menuLogging'
    }
  }
]

