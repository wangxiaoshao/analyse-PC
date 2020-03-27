<template>
    <el-submenu v-if="isSubMenu && isShowMenu()" :index="menuItem.menuId.toString()">
        <template slot="title">
            <i v-show="showIcon" class="menu-icon" :class="menuItem.icon"></i>
            <span slot="title">{{menuItem.name}}</span>
        </template>
        <sub-menu v-for="(subMenuItem, index) in menuItem.list" :key="index" :menu-item="subMenuItem" :showIcon="false"></sub-menu>
    </el-submenu>
    <el-menu-item-group v-else-if="isGroup">
        <template slot="title">
            <i v-show="showIcon" class="menu-icon" :class="menuItem.icon"></i>
            <span slot="title">{{menuItem.name}}</span>
        </template>
        <sub-menu v-for="(groupItem, index) in menuItem.list" :key="index" :menu-item="groupItem" :showIcon="false"></sub-menu>
    </el-menu-item-group>
    <el-menu-item v-else-if="menuItem && isShowMenu()" :index="menuItem.menuId.toString()">
        <template>
            <i v-show="showIcon" class="menu-icon" :class="menuItem.icon"></i>
            <span slot="title">{{menuItem.name}}</span>
        </template>
    </el-menu-item>
</template>
<script>
/**
 * Created by Luoxie on 2019-09-19.
 */
import util from '../utils'

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
    }
  },
  data () {
    return {}
  },
  created () {

  },
  methods: {
    isShowMenu () {
      let menuList = this.$store.state.app.option.menus
      let actionList = this.$store.state.app.option.actions
      if (Array.isArray(this.menuItem.key)) {
        let flag = false
        let len = this.menuItem.key.length
        for (let i = 0; i < len; i++) {
          let key = this.menuItem.key[i]
          // 显示通信录和文档中心
          // @date: 2020-03-14
          // 按要求去除对通讯录和文档中心的特殊通道
          /* if (key === 'menuAddrBook' || key === 'menuDocumentCenter') {
            return true
          } */
          let tempMenu = menuList.filter(item => {
            return item.moduleName === key
          })
          tempMenu.forEach(item => {
            for (let j = 0; j < actionList.length; j++) {
              if (item.authorityName === actionList[j]) {
                flag = true
                break
              }
            }
          })
        }
        return flag
      } else {
        let flag = false
        // 显示通信录和文档中心
        // @date: 2020-03-14
        // 去除通讯录和文档中心的特殊通道
        /* if (this.menuItem.key === 'menuAddrBook' || this.menuItem.key === 'menuDocumentCenter' || this.menuItem.key === 'menuHomePage') {
          return true
        } */
        /* if (this.menuItem.key === 'menuHomePage') {
          return true
        } */
        let tempMenu = menuList.filter(item => {
          return item.moduleName === this.menuItem.key
        })
        tempMenu.forEach(item => {
          for (let j = 0; j < actionList.length; j++) {
            if (item.authorityName === actionList[j]) {
              flag = true
              break
            }
          }
        })
        return flag
      }
    }
  },
  computed: {
    isItem () {
      return util.isEmptyArray(this.menuItem.list) && util.isEmptyArray(this.menuItem.list)
    },
    isGroup () {
      console.log(this.menuItem.group && this.menuItem.group.length > 0)
      return this.menuItem.group && this.menuItem.group.length > 0
    },
    isSubMenu () {
      return this.menuItem.list && this.menuItem.list.length > 0
    }
  }
}
</script>
