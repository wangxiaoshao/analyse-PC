/**
 * mixins
 *
 *
 */
export default {
    data() {
        return {};
    },
    methods: {
        trim(str) {
            return (str + "").replace(/(\s+)$/g, "").replace(/^\s+/g, "");
        },
    },
};
