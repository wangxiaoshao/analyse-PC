
const tableConfig = {
  applyName: {
    key: 'applyName',
    label: '申请人',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  },
  content: {
    key: 'content',
    label: '申请内容',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  },
  applyTime: {
    key: 'applyTime',
    label: '申请时间',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  },
  reason: {
    key: 'reason',
    label: '申请原因',
    sortable: false,
    showOverflowTooltip: true,
    minWidth: 100
  },
  state: {
    key: 'state',
    label: '审核状态',
    formatter: (row, column, cellValue) => {
      return cellValue === 1 ? '已审核' : '待审核'
    },
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  }
}
export default tableConfig
