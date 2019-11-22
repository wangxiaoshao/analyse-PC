<template>
    <el-menu ref="menu"
             :default-active="defaultActive"
             :default-openeds="defaultOpeneds"
             :mode="mode"
             :collapse="collapse"
             :background-color="backgroundColor"
             :text-color="textColor"
             :active-text-color="activeTextColor"
             :unique-opened="uniqueOpened"
             :menu-trigger="menuTrigger"
             :router="router"
             @open="openMenu"
             @close="closeMenu"
             @select="selectMenu">
        <sub-menu v-for="(menuItem, index) in innerMenus" :key="index" :menu-item="menuItem"></sub-menu>
	</el-menu>
</template>
<script type="text/ecmascript-6">

import subMenu from './sub-menu.vue'
import util from '../utils'

export default {
  name: 'menus',
  components: {
    subMenu
  },
  data () {
    return {
      innerMenus: [],
      _indexMap: {}
    }
  },
  props: {
    menus: Array,
    mode: String,
    defaultOpeneds: Array,
    defaultActive: [String, Number],
    collapse: Boolean,
    backgroundColor: String,
    textColor: String,
    activeTextColor: String,
    uniqueOpened: Boolean,
    menuTrigger: String,
    router: Boolean
  },
  created () {
    this._presetMenus()
  },
  methods: {
    /**
        * @description 数据检查一遍，查看index是否存在重复的情况，没有则设置index
        * */
    _presetMenus () {
      this._indexMap = Object.create(null)
      this.innerMenus = this.menus.map((menu) => {
        return this._checkIndex(menu)
      })
    },
    /**
        * @description 检查菜单索引是否设置正确
        * @param {Object} menu - 菜单项
        * @param {String} genIndex - 自动生成的index
        * */
    _checkIndex (menu) {
      // copy menu
      menu = Object.assign({}, menu)

      let id = menu.menuId
      if (util.asserts.noExistPropertyInMap(id, this._indexMap)) {
        this._indexMap[id] = menu
      }

      // 检查子菜单和分组情况
      if (menu.list) {
        menu.list = menu.list.map((menu) => {
          return this._checkIndex(menu)
        })
      }
      if (menu.group) {
        menu.group = menu.group.map((menu) => {
          return this._checkIndex(menu)
        })
      }
      return menu
    },
    openMenu (id) {
      this.$emit('open', id, this.getMenuItemById(id))
    },
    closeMenu (id) {
      this.$emit('close', id, this.getMenuItemById(id))
    },
    selectMenu (url, selectPath) {
      let menuItem = this.getMenuItemById(url)
      const breadcrumbArr = []
      this.$emit('select', url, menuItem, breadcrumbArr)
    },
    /**
        * @description 根据id获取当前的menuItem对象
        * @param {String} id
        * @return {Object}
        * */
    getMenuItemById (id) {
      return this._indexMap[id]
    },
    /**
        * @description 取得一个菜单项中的子菜单列表
        * @param {Object} menuItem
        * @return Array|Null
        * */
    getSubItems (menuItem) {
      if (util.isEmptyArray(menuItem.list) === false) {
        return menuItem.list
      } else if (util.isEmptyArray(menuItem.group) === false) {
        return menuItem.group
      } else {
        return null
      }
    },
    /**
        * @description 打开子菜单 since 2.0
        * @method open
        * @param {String} id - 需要打开的 sub-menu 的 id
        * */
    open (id) {
      return this.$refs.menu.open(id)
    },
    /**
        * @description 关闭子菜单 since 2.0
        * @method close
        * @param {String} id - 需要收起的 sub-menu 的 id
        * */
    close (id) {
      return this.$refs.menu.close(id)
    }
  },
  watch: {
    menus () {
      this._presetMenus()
    }
  }
}
</script>
