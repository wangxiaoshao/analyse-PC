/**
 * 检测当前用户角色
 */

export default {
  data () {
    return {}
  },
  methods: {
    checkRole (roleName) {
      for (let role of this.$store.state.app.option.authorizedEntityVos) {
        if (role.name === roleName) {
          return true
        }
      }

      return false
    }
  }
}
