export default {
    data() {
        return {};
    },
    methods: {
        hideName(name) {
            //  return (name + '').replace( /^(.).+(.)$/, '$1*$2')
            return new Array(name.length).join("*") + name.substr(-1);
        },
    },
};
