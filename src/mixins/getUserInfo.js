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
      api[urlNames['option']]().then((res) => {
        if (res.status === 0) {
          this.$store.commit('SET_OPTION', res.data || {})
        } else {
          alert(res.message)
        }
      })
    }
  }
}
