<template>
    <div class="site-aside">
        <el-aside :width="isCollapse ? '64px' : '210px'">
            <div class="logo">
                <img src="@src/common/images/logo.png" alt="" />
            </div>
            <el-scrollbar :style="asideStyle">
                <div v-bind:class="isCollapse ? 'collapse' : ''">
                    <!--        <div index="brand" class="site-brand" v-on:click="toggleAsideCollapse">-->
                    <!--          <span v-show="!isCollapse" class="brand-name">组织机构管控平台</span>-->
                    <!--          <span class="aside-toggle"></span>-->
                    <!--        </div>-->
                    <menus
                        :menus="asideMenuList"
                        :collapse="isCollapse"
                        :defaultActive="defaultActive"
                        @open="open"
                        @close="close"
                        @select="select"
                        background-color="#F6F8FC"
                        text-color="#4A4A4A"
                        class="example"
                        :router="false"
                    ></menus>
                </div>
            </el-scrollbar>
        </el-aside>
        <div class="aside-toggle" v-on:click="toggleAsideCollapse">
            <i
                class="fa"
                :class="
                    isCollapse
                        ? 'rightan fa-angle-double-right'
                        : 'leftan fa-angle-double-left'
                "
            ></i>
        </div>
    </div>
</template>
<script>
import Menus from '@src/components/Packages/menus'
import './index.less'
import { mapState } from 'vuex'

export default {
  components: {
    Menus
  },
  computed: {
    ...mapState(['app']),
    asideStyle () {
      return {
        height: this.app.windowHeight - 110 + 'px',
        width: '100%'
      }
    },
    arrowClass () {
      return this.isCollapse
        ? 'el-icon-arrow-right'
        : 'el-icon-arrow-left'
    }
  },
  watch: {
    asideMenu (newVal) {
      if (newVal) {
        this.asideMenuList = newVal.list
      }
    }
  },
  props: {
    defaultActive: {
      type: String,
      default () {
        return ''
      }
    },
    asideMenu: {
      type: Object,
      default () {
        return { list: [] }
      }
    }
  },
  data () {
    return {
      isCollapse: false,
      asideMenuList: []
    }
  },
  created () {},
  mounted () {
    this.asideMenuList = this.asideMenu.list
  },
  methods: {
    open: function (name, menu) {
      // eslint-disable-next-line
        },
    close: function (name, menu) {
      // eslint-disable-next-line
        },
    toggleAsideCollapse () {
      this.isCollapse = !this.isCollapse
    },
    select (code, menuItem, selectPath) {
      this.$emit('select', code, menuItem, selectPath)
    }
  }
}
</script>
