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
        trim(str) {
            return (str + "").replace(/(\s+)$/g, "").replace(/^\s+/g, "");
        },
    },
};
