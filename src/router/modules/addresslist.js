// 通讯录
const AddressList = () =>
    import(
        /* webpackChunkName: "AddressList" */ "@src/views/address-list/index.vue"
    );
const Department = () =>
    import(
        /* webpackChunkName: "AddressList" */ "@src/views/address-list/department/index.vue"
    );
const Member = () =>
    import(
        /* webpackChunkName: "AddressList" */ "@src/views/address-list/member/index.vue"
    );
// const AddressBook = () => import('@src/views/address-book/index.vue')
// const UnitAddressBook = () => import('@src/views/address-book/unit-address-book/index.vue')

export default [
    /** 通讯录 */
    {
        path: "/address-list-dept",
        name: "AddressListDept",
        component: AddressList,
        meta: {
            key: "menuAddrBookDept",
        },
    },
    {
        path: "/address-list-all",
        name: "AddressListAll",
        component: AddressList,
        meta: {
            key: "menuAddrBookAll",
        },
    },
    {
        path: "/department",
        name: "Department",
        component: Department,
    },
    {
        path: "/member",
        name: "Member",
        component: Member,
    },
];
