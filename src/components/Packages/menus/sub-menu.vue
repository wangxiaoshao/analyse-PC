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
      // return true
      if (Array.isArray(this.menuItem.key)) {
        let hasRight = false
        let len = this.menuItem.key.length
        for (let i = 0; i < len; i++) {
          let key = this.menuItem.key[i]
          let hasKey = this.$store.state.app.option.menus.find(item => {
            return item.moduleName === key;
          });
          if (this.$store.state.app.option.menus && hasKey) {
            hasRight = true
            break
          }
        }
        return hasRight
      } else {
        return this.$store.state.app.option.menus.find(item => {
          return item.moduleName === this.menuItem.key;
        });
      }
    }
  },
  computed: {
    isItem () {
      return util.isEmptyArray(this.menuItem.list) && util.isEmptyArray(this.menuItem.list)
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
