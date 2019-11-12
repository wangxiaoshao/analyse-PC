
const tableConfig = {
  dictName: {
    key: 'dictName',
    tooltip: false,
    label: '字典名称',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  },
  dictId: {
    key: 'dictId',
    tooltip: false,
    label: '字典ID',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  },
  dictDescribe: {
    key: 'dictDescribe',
    tooltip: true,
    label: '字典描述',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  },
  isEnable: {
    key: 'isEnable',
    tooltip: false,
    label: '启用状态',
    sortable: false,
    formatter: ({ cellValue }) => {
      return cellValue === 1 ? '启用' : '禁用'
    },
    showOverflowTooltip: false,
    minWidth: 100
  }
}
export default tableConfig
