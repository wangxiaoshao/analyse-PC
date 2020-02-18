// 通讯录
const AddressList = () => import('@src/views/address-list/index.vue')
const Department = () => import('@src/views/address-list/department/index.vue')
const Member = () => import('@src/views/address-list/member/index.vue')
// const AddressBook = () => import('@src/views/address-book/index.vue')
// const UnitAddressBook = () => import('@src/views/address-book/unit-address-book/index.vue')

export default [
  /** 通讯录 */
  {
    path: '/address-list',
    name: 'AddressList',
    component: AddressList,
    meta: {
      key: 'menuAddrBook'
    }
  },
  {
    path: '/department',
    name: 'Department',
    component: Department
  },
  {
    path: '/member',
    name: 'Member',
    component: Member
  }
]
