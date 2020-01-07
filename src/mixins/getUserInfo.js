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
      let options
      api[urlNames['option']]().then((res) => {
        if (res.status === 0) {
          options = res.data;
        } else {
          alert(res.message)
        }
      })
      this.$store.commit('SET_OPTION', options || {})
    }
  }
}
