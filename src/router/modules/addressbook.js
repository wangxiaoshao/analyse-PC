// 通讯录
const AddressBook = () =>
  import('@src/views/address-book/index.vue')
const UnitAddressBook = () =>
  import('@src/views/address-book/unit-address-book/index.vue')
const Department = () => import('@src/views/address-book/components/Department/index.vue')
const MemberList = () =>
  import('@src/views/address-book/member-list/index.vue')

export default [
  /** 通讯录 */
  {
    path: '/address-book',
    name: 'AddressBook',
    component: AddressBook,
    // redircet: '/address-book/unit-address-book/',
    children: [
      // {
      //   path: '/',
      //   name: 'Department',
      //   component: Department
      // },
      {
        path: '/member-list',
        name: 'MemberList',
        component: MemberList
      }
    ],
  },
  {
    path: '/department',
    name: 'Department',
    component: Department
  },

]
