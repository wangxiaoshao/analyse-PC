<template>
  <el-table
    :data="tableData"
    @sort-change="sort"
    :height="tableHeight"
    :col-merge-config="mergeConfig"
    :span-method="openColMerge"
    v-loading="tableLoading"
    border
    @selection-change="selectionChange"
    style="width: 100%">
    <template slot="empty">
     <div class="empty">
       <p><img class="data-pic" src="@src/common/images/no-data.png" alt=""/></p>
       <p><span style="padding-left: 8px">暂无数据！</span></p>
     </div>
    </template>
    <el-table-column type="selection" v-if="tableCheckbox" width="50" align="center"></el-table-column>
    <el-table-column type="index" v-if="tableIndex" width="60" align="center" label="#">
      <template slot-scope="scope">{{scope.$index+(pageConfig.page - 1) * pageConfig.limit + 1}}</template>
    </el-table-column>
    <el-table-column type="index" v-if="tableIndex" width="60" align="center" label="#">
      <template slot-scope="scope">{{scope.$index+(pageConfig.page - 1) * pageConfig.limit + 1}}</template>
    </el-table-column>
    <slot name="prePersonalColumn"></slot>
    <template v-for="item in tableConfig">
      <el-table-column
        :prop="item.key"
        align="center"
        label-class-name="black"
        :formatter="item.formatter"
        :label="item.label"
        :key="item.key"
        :sortable="item.sortable"
        :show-overflow-tooltip="item.showOverflowTooltip || false"
        :min-width="item.minWidth || null">
      </el-table-column>
    </template>
    <slot></slot>
    <el-table-column label="操作" align="center" v-if="operate" :width="operateWidth">
      <template slot-scope="scope">
        <slot name="operate" :slot-scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>

export default {
  name: 'SiteTable',
  props: {
    tableConfig: {
      type: Object,
      default () {
        return {}
      }
    },
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    tableHeight: {
      type: Number | String | null,
      default: null
    },
    mergeConfig: {
      type: Array | null,
      default: null
    },
    // 以下在wf基础上新增的
    tableCheckbox: {
      type: Boolean,
      default: false
    },
    tableIndex: {
      type: Boolean,
      default: false
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    operate: {
      type: Boolean,
      default: true
    },
    operateWidth: {
      type: Number | null,
      default: 300
    },
    pageConfig: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    /*
      * @openColMerge：开启表格合并功能
      * @param：
      *  mergeConfig: {
              ele: 'row' 或 'col' 合并行还是列
              eleIndex: 2, 需要合并的元素的索引值
              rowspan: 1, 行合并数
              colspan: 2, 列合并数
            },
      */
    openColMerge ({ rowIndex, columnIndex }) {
      let len = this.mergeConfig ? this.mergeConfig.length : 0
      for (let i = 0; i < len; i++) {
        let ele = this.mergeConfig[i].ele === 'col' ? columnIndex : rowIndex
        if (ele === this.mergeConfig[i].eleIndex) {
          let rowspan = this.mergeConfig[i].rowspan
          let colspan = this.mergeConfig[i].colspan
          return [rowspan, colspan]
        }
      }
    },
    // 排序
    sort () {
      this.$emit('sort-change')
    },
    selectionChange (selection) {
      this.$emit('selection-change', selection)
    }
  }
}
</script>
<style scoped lang="less">
  .empty {
    p {
      margin: 0;
      font-size: 0px;
      text-align: center;
      line-height: 16px!important;
    }

    span {
      font-size: 12px;
    }
  }

  .data-pic {
    padding-top: 20px;
    width: 60px;
    height: auto;
  }

  .black {
    color: black;
  }

  .red {
    color: #F56C6C;
  }

  .green {
    color: #67C23A;
  }
</style>
