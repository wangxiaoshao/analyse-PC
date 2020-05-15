/**
 * mixins
 * 翻页、排序、过滤、自动计算table高度
 * 获取列表方法名需要统一为 getGrid()
 */
export default {
    data() {
        return {};
    },
    methods: {
        hasRight(rightKey) {
            if (
                this.$store.state.app.option &&
                this.$store.state.app.option.actions.length > 0
            ) {
                return (
                    this.$store.state.app.option.actions.indexOf(rightKey) > -1
                );
            } else {
                return false;
            }
        },
    },
};
