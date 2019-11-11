<template>
  <div>
    <el-cascader
      :options="options"
      :props="props"
    >
    </el-cascader>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'

export default {
  data () {
    return {
      options: [], // 第一次加载数据
      value: '',
      props: {
        lazy: true,
        children: 'children',
        label: 'name',
        value: null,
        lazyLoad (node, resolve) {
          if (!node.data) {
            return
          }
          if (node.data) {
            api[urlNames['getAreaList']]({
              parentId: node.data.id
            }).then((res) => {
              resolve(res.data)
              this.value = node.data.id
              this.$emit('getAreaId', this.value)
              console.log(this.value)
            })
          }
        }
      }
    }
  },
  methods: {
    getArea (parentId) {
      api[urlNames['getAreaList']]({
        parentId: parentId
      }).then((res) => {
        this.options = res.data
      })
    }
  },
  created () {
    this.getArea()
  }
}
</script>
