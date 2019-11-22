
const tableConfig = {
  fieldName: {
    key: 'fieldName',
    tooltip: false,
    label: '审核项',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 50
  },
  beforeChangeValue: {
    key: 'beforeChangeValue',
    tooltip: false,
    label: '原值',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  },
  afterChangeValue: {
    key: 'afterChangeValue',
    tooltip: true,
    label: '变更值',
    sortable: false,
    showOverflowTooltip: false,
    minWidth: 100
  }
}
export default tableConfig
