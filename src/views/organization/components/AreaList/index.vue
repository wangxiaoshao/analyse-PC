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
        value: 'id',
        lazyLoad (node, resolve) {
          console.log(node)
          if (!node.data) {
            return
          }
          if (node.data) {
            api[urlNames['getAreaList']]({
              parentId: node.data.id
            }).then((res) => {
              resolve(res.data)
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
    this.getArea(-1)
  }
}
</script>
