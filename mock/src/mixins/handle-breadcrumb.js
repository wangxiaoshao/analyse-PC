/**
 * mixins
 * 设置面包屑
 */
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      breadcrumb: []
    }
  },
  computed: {
    ...mapState(['app'])
  },
  methods: {
    ...mapMutations(['SET_BREADCRUMB', 'SET_PAGE_BREADCRUMB']),
    /*
     * @Description: 递归遍历menuList，设置面包屑数组
     * @Param list<array> : 需要遍历的list
     * @Param url<string> : 当前菜单的url，也是当前路由的path
     * @Param index<number> : 当前list嵌套的层级，也是breadcrumb的index
     */
    findMenuByPath (list, path, index) {
      for (let item of list) {
        // TODO: better way to break loop
        if (this.breakLoop) {
          break
        } else {
          this.breadcrumb[index] = item
          if (item.list && item.list.length > 0) {
            this.findMenuByPath(item.list, path, index + 1)
          } else {
            if (path === '/') { // 路由没有指定具体路径
              let length = this.breadcrumb.length
              if (length > (index - 1)) {
                this.breadcrumb.splice(index + 1, (length - index - 1)) // 将面包屑最后一个元素替换成当前菜单
              }
              this.breakLoop = true
              break
            } else {
              if (path.indexOf(item.path) > -1) {
                let length = this.breadcrumb.length
                if (length > (index - 1)) {
                  this.breadcrumb.splice(index + 1, (length - index - 1)) //  // 将面包屑最后一个元素替换成当前菜单
                }
                this.breakLoop = true
                break
              }
            }
          }
        }
      }
    },
    pushBreadcrumb (item) {
      let breadcrumb = [...this.app.pageBreadcrumb]
      breadcrumb.push(item)
      this.SET_PAGE_BREADCRUMB(breadcrumb)
    },
    setBreadcrumb (breadcrumb) {
      this.SET_BREADCRUMB(breadcrumb)
    }
  },
  mounted () {

  }
}
