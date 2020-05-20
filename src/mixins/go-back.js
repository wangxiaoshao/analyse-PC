/**
 *
 * 返回提示信息
 */
export default {
    data() {
        return {
            isChange: false,
        };
    },
    methods: {
        addWatch(newDate, oldDate) {
            return JSON.stringify(newDate) !== JSON.stringify(oldDate);
        },
        goBackDilog(cb, ruleForm, close) {
            this.$confirm("修改内容尚未保存, 是否保存?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    if (ruleForm) {
                        cb(ruleForm);
                    } else {
                        cb();
                    }
                    this.$router.go(-1);
                    this.isChange = false;
                })
                .catch(() => {
                    this.isChange = false;
                    if (close) {
                        this.$emit("close");
                    } else {
                        this.$router.go(-1);
                    }
                });
        },
    },
};
