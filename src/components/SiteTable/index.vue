<template>
    <el-table
            :data="tableData"
            @sort-change="sort"
            :height="tableHeight"
            v-loading = "tableLoading"
            border
            @selection-change="selectionChange"
            style="width: 100%">
        <el-table-column type="selection" v-if="tableCheckbox" width="50" align="center"></el-table-column>
        <el-table-column type="index" v-if="tableIndex" width="60" align="center" label="#">
            <template slot-scope="scope">{{scope.$index+(pageConfig.page - 1) * pageConfig.limit + 1}}</template>
        </el-table-column>
        <template v-for="item in tableConfig">
          <el-table-column
                        :prop="item.key"
                        v-if="!item.tooltip"
                        align="center"
                        :formatter="item.formatter"
                        :label="item.label"
                        :key="item.key"
                        :sortable="item.sortable"
                        :show-overflow-tooltip="item.showOverflowTooltip || false"
                        :min-width="item.minWidth || null">
        </el-table-column>
        <el-table-column v-else
                        align="center"
                        :formatter="item.formatter"
                        :label="item.label"
                        :key="item.key"
                        :sortable="item.sortable"
                        :show-overflow-tooltip="item.showOverflowTooltip || false"
                        :min-width="item.minWidth || null">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row[item.field]" placement="top">
                  <div>
                    {{scope.row[item.field]}}
                  </div>
                </el-tooltip>
              </template>
        </el-table-column>
        </template>

        <el-table-column label="操作" align="center" fixed="right" v-if="operate" :width="operateWidth">
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
  created () {
    console.log(this.tableConfig)
  },
  methods: {
    // 排序
    sort () {
      this.emit('sort-change')
    },
    selectionChange (selection) {
      this.$emit('selection-change', selection)
    }
  }
}
</script>
