
const tableConfig = {
  applyName: {
    key: 'applyName',
    field: 'applyName',
    tooltip: false,
    label: '申请人',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  },
  content: {
    key: 'content',
    tooltip: true,
    label: '申请内容',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  },
  applyTime: {
    key: 'applyTime',
    tooltip: false,
    label: '申请时间',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  },
  reason: {
    key: 'reason',
    tooltip: true,
    label: '申请原因',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  },
  state: {
    key: 'state',
    tooltip: false,
    label: '审核状态',
    sortable: true,
    formatter: ({ cellValue }) => {
      return cellValue === 1 ? '通过' : '不通过'
    },
    showOverflowTooltip: false,
    minWidth: 100
  },
  auditTime: {
    key: 'auditTime',
    tooltip: false,
    label: '审核时间',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  },
  auditOpinion: {
    key: 'auditOpinion',
    field: 'auditOpinion',
    tooltip: false,
    label: '审核意见',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  }
}
export default tableConfig
