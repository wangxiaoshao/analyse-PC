const Certification = () =>
    import(
        /* webpackChunkName: "Certification" */ "@src/views/certification/index.vue"
    );
export default [
    {
        path: "/certification",
        name: "Certification",
        component: Certification,
    },
];
