
const tableConfig = {
  subject: {
    key: 'subject',
    tooltip: false,
    label: '字典名称',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  },
  id: {
    key: 'id',
    tooltip: false,
    label: '字典ID',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  },
  description: {
    key: 'description',
    tooltip: true,
    label: '字典描述',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  },
  removed: {
    key: 'removed',
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
