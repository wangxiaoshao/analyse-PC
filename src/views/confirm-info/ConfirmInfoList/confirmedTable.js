
const tableConfig = {
  orgName: {
    key: 'orgName',
    tooltip: false,
    label: '单位名称',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  },
  leaderName: {
    key: 'leaderName',
    tooltip: true,
    label: '单位主要领导',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  },
  month: {
    key: 'month',
    tooltip: false,
    label: '确认月份',
    sortable: false,
    showOverflowTooltip: false,
    formatter (row, column, cellValue) { // 处理后段传输格式为201911 => 11(提出月份)
      cellValue = cellValue ? cellValue.toString() : ''
      let monthArr = cellValue.split('') || []
      let len = monthArr.length
      let newStr = ''
      newStr = monthArr.slice(len - 2)
      if (+monthArr[len - 2] === 0) {
        newStr = monthArr.slice(len - 1)
      }
      return newStr
    },
    minWidth: 100
  },
  confirmTime: {
    key: 'confirmTime',
    tooltip: false,
    label: '确认时间',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  },
  confirmName: {
    key: 'confirmName',
    tooltip: false,
    label: '确认人员',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  }
}
export default tableConfig
