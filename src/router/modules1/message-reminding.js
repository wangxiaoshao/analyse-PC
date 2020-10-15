const MessageReminding = () =>
    import(
        /* webpackChunkName: "MessageReminding" */ "@src/views/message-reminding/index.vue"
    );
const MessageRules = () =>
    import(
        /* webpackChunkName: "MessageReminding" */ "@src/views/message-reminding/message-rules/index.vue"
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
        children: [],
    },
    {
        path: "/message-reminding/message-rules",
        name: "MessageRules",
        component: MessageRules,
    },
];
