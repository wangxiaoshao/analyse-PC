import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapState(["app"]),
        applicationList() {
            return this.app.applicationList;
        },
    },
    methods: {
        ...mapMutations(["SET_APPLY_LIST"]),
    },
};
