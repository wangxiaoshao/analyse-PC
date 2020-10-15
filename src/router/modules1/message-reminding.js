const MessageReminding = () =>
    import(
        /* webpackChunkName: "MessageReminding" */ "@src/views/message-reminding/index.vue"
    );
export default [
    {
        // 通知提醒
        path: "/message-reminding",
        name: "MessageReminding",
        component: MessageReminding,
        // meta: {
        //     key: "menuMessageReminding",
        // },
    },
];
