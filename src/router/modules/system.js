// 角色权限
const RoleManage = () => import("@src/views/role-manage/index.vue");
const lookPersonPermission = () =>
    import("@src/views/role-manage/look-person-permission/index.vue");
// 字典管理
const DictionaryManage = () =>
    import("@src/views/system-setting/dictionary-manage/index.vue");
// 系统设置
const SystemSetting = () => import("@src/views/system-setting/index.vue");
// 参数配置
const ParameterSetting = () =>
    import("@src/views/system-setting/parameter-setting/index.vue");
const PassChange = () =>
    import("@src/views/system-setting/pass-change/index.vue");
// 菜单权限配置
const AuthoritySetting = () =>
    import("@src/views/system-setting/authority-setting/index.vue");
// 帮助中心
const WordCenter = () =>
    import("@src/views/system-setting/word-center/index.vue");
// 文章详情
const WordDetial = () =>
    import("@src/views/system-setting/word-detial/index.vue");
// 文件上传
const WordUnload = () =>
    import("@src/views/system-setting/word-unload/index.vue");

export default [
    // 权限管理
    {
        path: "/parameter-setting",
        name: "ParameterSettings",
        component: ParameterSetting,
        meta: {
            key: "menuPreferencesSetting",
        },
    },
    // 权限配置
    {
        path: "/authority-setting",
        name: "AuthoritySetting",
        component: AuthoritySetting,
        meta: {
            key: "menuRightSetting",
        },
    },
    {
        path: "/dictionary-manage",
        name: "DictionaryManage",
        component: DictionaryManage,
        meta: {
            key: "menuDictionary",
        },
    },
    {
        path: "/pass-change",
        name: "PassChange",
        component: PassChange,
        meta: {
            key: "menuPersonalInfo",
        },
    },
    {
        path: "/word-center",
        name: "WordCenter",
        component: WordCenter,
        meta: {
            key: "menuDocumentCenter",
        },
    },
    {
        path: "/word-center/word-detial/:id",
        name: "WordDetial",
        component: WordDetial,
    },
    {
        path: "/word-center/word-unload",
        name: "WordUnload",
        component: WordUnload,
    },
];
