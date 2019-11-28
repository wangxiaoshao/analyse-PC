
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
    formatter (row, column, cellValue) {
      let timeStr = ''
      if (cellValue) {
        timeStr = cellValue.split(' ')[0]
      }
      return timeStr
    },
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
  auditTime: {
    key: 'auditTime',
    tooltip: false,
    label: '审核时间',
    formatter (row, column, cellValue) {
      let timeStr = ''
      if (cellValue) {
        timeStr = cellValue.split(' ')[0]
      }
      return timeStr
    },
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
