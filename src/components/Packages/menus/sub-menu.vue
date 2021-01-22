<template>
    <!--  当设置 hidden 时，表示不显示 -->
    <div v-if="!menuItem.hidden">
        <!-- 当只有一个子菜单的话，那么就不用显示子级
        或者没有子菜单的时候
       -->
        <template
            v-if="
                hasOneShowingChild(menuItem.children, menuItem) &&
                (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
                !menuItem.alwaysShow
            "
        >
            <el-menu-item :index="resolvePath(onlyOneChild.path)">
                <template>
                    <i
                        v-show="showIcon"
                        class="menu-icon"
                        :class="menuItem.meta && menuItem.meta.icon"
                    ></i>
                    <span slot="title">{{
                        menuItem.meta && menuItem.meta.title
                    }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 还有子菜单 -->
        <el-submenu v-else :index="resolvePath(menuItem.path)">
            <template slot="title">
                <i
                    v-show="showIcon"
                    class="menu-icon"
                    :class="menuItem.meta && menuItem.meta.icon"
                ></i>
                <span slot="title">{{
                    menuItem.meta && menuItem.meta.title
                }}</span>
            </template>
            <sub-menu
                v-for="child in menuItem.children"
                :key="child.path"
                :is-nest="true"
                :menu-item="child"
                :base-path="resolvePath(child.path)"
            ></sub-menu>
        </el-submenu>
    </div>
</template>
<script>
import path from 'path'

function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export default {
  name: 'subMenu',
  props: {
    menuItem: {
      type: Object,
      default () {
        return {}
      }
    },
    showIcon: {
      type: Boolean,
      default () {
        return true
      }
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild (children = [], parent) {
      const showingChildren = children.filter((menuItem) => {
        if (menuItem.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = menuItem
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = {
          ...parent,
          path: '',
          noShowingChildren: true
        }
        return true
      }

      return false
    },
    resolvePath (routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
