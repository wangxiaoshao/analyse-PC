//通讯录
const AddressBook = () =>
    import('@src/views/address-book/index.vue')
const UnitAddressBook = () =>
    import('@src/views/address-book/unit-address-book/index.vue')
const MemberList = () =>
    import('@src/views/address-book/member-list/index.vue')

export default [
    /**通讯录 */
    {
        path: "/address-book",
        name: 'AddressBook',
        component: AddressBook,
        // redircet: '/address-book/unit-address-book/',
        children: [{
            path: '/',
            name: 'UnitAddressBook',
            component: UnitAddressBook,
        },
        {
            path: '/member-list',
            name: 'MemberList',
            component: MemberList
        }

        ]

    }
]