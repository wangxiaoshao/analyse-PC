<template>
  <div>
    <el-cascader
      :options="options"
      :props="props"
      style="width: 100%"
      v-model="areaValue"
      @change="getAreaValue"
    >
    </el-cascader>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'

export default {
  props: ['areaOption'],
  data () {
    return {
      areaValue: [],
      options: [], // 第一次加载数据
      value: '',
      props: {
        multiple: false,
        lazy: true,
        children: 'children',
        label: 'name',
        value: 'id',
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
            })
          }
        }
      }
    }
  },
  created () {
    this.getArea()
  },
  methods: {
    getArea (parentId) {
      api[urlNames['getAreaList']]({
        parentId: parentId
      }).then((res) => {
        this.options = res.data
      })
    },
    getAreaValue (val) {
      this.$emit('getAreaId', val)
      console.log(val)
    }
  }
}
</script>
