<template>
    <el-submenu
        v-if="isSubMenu && isShowMenu1()"
        :index="menuItem.menuId.toString()"
    >
        <template slot="title">
            <i v-show="showIcon" class="menu-icon" :class="menuItem.icon"></i>
            <span slot="title">{{ menuItem.name }}</span>
        </template>
        <sub-menu
            v-for="(subMenuItem, index) in menuItem.list"
            :key="index"
            :menu-item="subMenuItem"
            :showIcon="false"
        ></sub-menu>
    </el-submenu>
    <el-menu-item-group v-else-if="isGroup">
        <template slot="title">
            <i v-show="showIcon" class="menu-icon" :class="menuItem.icon"></i>
            <span slot="title">{{ menuItem.name }}</span>
        </template>
        <sub-menu
            v-for="(groupItem, index) in menuItem.list"
            :key="index"
            :menu-item="groupItem"
            :showIcon="false"
        ></sub-menu>
    </el-menu-item-group>
    <el-menu-item
        v-else-if="menuItem && isShowMenu1()"
        :index="menuItem.menuId.toString()"
    >
        <template>
            <i v-show="showIcon" class="menu-icon" :class="menuItem.icon"></i>
            <span slot="title">{{ menuItem.name }}</span>
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
  created () {},
  methods: {
    isShowMenu1 () {
      const showFlag = true

      // let roles1 = this.$store.state.app.rolesInfo.id;
      // // 角色权限控制菜单显示
      // if (roles1 === 1) {
      //     if (this.menuItem.key === "menuDataTemplate") {
      //         showFlag = false;
      //     }
      // }
      return showFlag
    },
    isShowMenu () {
      const menuList = this.$store.state.app.option.menus
      const actionList = this.$store.state.app.option.actions
      if (Array.isArray(this.menuItem.key)) {
        let flag = false
        const len = this.menuItem.key.length
        for (let i = 0; i < len; i++) {
          const key = this.menuItem.key[i]
          // 显示通信录和帮助中心
          // @date: 2020-03-14
          // 按要求去除对通讯录和帮助中心的特殊通道
          /* if (key === 'menuAddrBook' || key === 'menuDocumentCenter') {
            return true
          } */
          const tempMenu = menuList.filter((item) => {
            return item.moduleName === key
          })
          tempMenu.forEach((item) => {
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
        // 显示通信录和帮助中心
        // @date: 2020-03-14
        // 去除通讯录和帮助中心的特殊通道
        /* if (this.menuItem.key === 'menuAddrBook' || this.menuItem.key === 'menuDocumentCenter' || this.menuItem.key === 'menuHomePage') {
          return true
        } */

        const tempMenu = menuList.filter((item) => {
          return item.moduleName === this.menuItem.key
        })
        tempMenu.forEach((item) => {
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
      return (
        util.isEmptyArray(this.menuItem.list) &&
                util.isEmptyArray(this.menuItem.list)
      )
    },
    isGroup () {
      return this.menuItem.group && this.menuItem.group.length > 0
    },
    isSubMenu () {
      return this.menuItem.list && this.menuItem.list.length > 0
    }
  }
}
</script>
