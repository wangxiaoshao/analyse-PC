<template>
  <div class="site-breadcrumb">
    <el-row>
      <el-col :span="20">
        <el-breadcrumb v-if="breadcrumb.length > 0">
          <el-breadcrumb-item><i class="fa fa-home"></i></el-breadcrumb-item>
          <el-breadcrumb-item v-for="item in breadcrumb"
                              class="breadcrumb-item"
                              :key="item.menuId">{{item.name}}</el-breadcrumb-item>
          <el-breadcrumb-item v-for="(pageItem,index) in pageBreadcrumb"  :key="index"
                              class="breadcrumb-item">{{pageItem.name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="4" class="text-right">
        <el-button size="mini"
                   v-show="pageBreadcrumb.length > 0"
                   @click="goBack">返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script type="text/ecmascript-6">
/**
   * Created by lxe on 2019-09-18.
   */
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
    breadcrumb: {
      type: Array,
      default () {
        return []
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
    }
  },
  created () {

  },
  methods: {
    goBack () {
      this.$emit('go-back')
    }
  }
}
</script>
