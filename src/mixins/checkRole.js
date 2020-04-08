/**
 * 检测当前用户角色
 */

export default {
  data () {
    return {}
  },
  methods: {
    checkRole (roleName) {
      let found = this.$store.state.app.option.authorizedEntityVos.find(function (item) {
        return roleName === item.name
      })

      return found
    }
  }
}
