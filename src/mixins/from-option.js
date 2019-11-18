/**
 * mixins
 * 查询用户可用配置
 */
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      options: [], // key/value配置
      actions: [], // 操作权限列表
      menus: [] // 菜单权限列表
    }
  },
  computed: {
    ...mapState(['app'])
  },
  methods: {
    ...mapMutations(['DIC_LIST'])
  },
  mounted () {}
}
