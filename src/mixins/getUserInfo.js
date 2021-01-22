/**
 * 获取用户信息，用于权限配置时刷新配置
 *
 */
import { api, urlNames } from '@src/api'
export default {
  data () {
    return {}
  },
  methods: {
    getGlobalInfo () {
      api[urlNames.getUserRole]().then((res) => {
        if (res.status === 0) {
          this.$store.commit('SET_ROLE_INFO', res.data || {})
        } else {
          alert(res.message)
        }
      })
    }
  }
}
