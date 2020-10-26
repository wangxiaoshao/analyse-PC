const Assessment = () =>
    import(
        /* webpackChunkName: "Assessment" */ "@src/views/assessment/index.vue"
    );
export default [
    {
        path: "/assessment",
        name: "Assessment",
        component: Assessment,
    },
];
