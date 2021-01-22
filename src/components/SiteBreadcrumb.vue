<template>
    <div class="site-breadcrumb">
        <el-row>
            <el-col :span="20">
                <el-breadcrumb>
                    <el-breadcrumb-item>
                        <i class="fa fa-home"></i>
                    </el-breadcrumb-item>
                    <template v-if="$route.meta.breadcrumb">
                        <el-breadcrumb-item
                            v-for="(item, index) in $route.meta.breadcrumb"
                            class="breadcrumb-item"
                            :key="index"
                            >{{ item.name }}</el-breadcrumb-item
                        >
                    </template>
                    <template v-else>
                        <el-breadcrumb-item
                            v-for="item in levelList"
                            class="breadcrumb-item"
                            :key="item.path"
                            >{{ item.meta.title }}</el-breadcrumb-item
                        >
                    </template>

                    <el-breadcrumb-item
                        v-for="(pageItem, index) in pageBreadcrumb"
                        :key="index"
                        class="breadcrumb-item"
                        >{{ pageItem.name }}</el-breadcrumb-item
                    >
                </el-breadcrumb>
            </el-col>
            <el-col :span="4" class="text-right">
                <el-button
                    size="mini"
                    v-show="pageBreadcrumb.length > 0"
                    @click="goBack"
                    >返回</el-button
                >
                <el-button
                    size="mini"
                    class="goBackBtn"
                    v-if="noticeShowBtn"
                    @click="goHome"
                    >返回</el-button
                >
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
  components: {},
  name: 'SiteBreadcrumb',
  props: {
    user: {
      type: Object,
      default () {
        return {}
      }
    },
    // breadcrumb: {
    //     type: Array,
    //     default() {
    //         return [];
    //     },
    // },
    noticeShowBtn: {
      type: Boolean,
      default () {
        return false
      }
    },
    pageBreadcrumb: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // breadcrumb: [],
      levelList: []
    }
  },

  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    goBack () {
      this.$emit('go-back')
    },
    goHome () {
      this.$emit('goHome')
    },

    getBreadcrumb () {
      // debugger
      // only show routes with meta.title
      const matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      )
      // const first = matched[0];

      this.levelList = matched.filter(
        (item) =>
          item.meta &&
                    item.meta.title &&
                    item.meta.breadcrumb !== false
      )
    }
  }
}
</script>
