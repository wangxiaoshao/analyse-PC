/**
 * 检测当前用户角色
 */

export default {
    data() {
        return {};
    },
    methods: {
        isRole(roleName) {
            let found = this.$store.state.app.option.authorizedEntityVos.find(
                function (item) {
                    return roleName === item.roleName;
                }
            );

            return found;
        },
    },
};
