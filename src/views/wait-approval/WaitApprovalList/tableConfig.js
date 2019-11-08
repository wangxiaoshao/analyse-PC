
export default {
  tableConfig: {
    order: {
      key: 0,
      field: 'order',
      tooltip: false,
      label: '序号',
      sortable: false,
      showOverflowTooltip: false,
      minWidth: 50
    },
    applyName: {
      key: 1,
      field: 'applyName',
      tooltip: false,
      label: '申请人',
      sortable: false,
      showOverflowTooltip: false,
      minWidth: 100
    },
    content: {
      key: 2,
      field: 'content',
      tooltip: true,
      label: '申请内容',
      sortable: false,
      showOverflowTooltip: false,
      minWidth: 100
    },
    applyTime: {
      key: 3,
      field: 'applyTime',
      tooltip: false,
      label: '申请时间',
      sortable: false,
      showOverflowTooltip: false,
      minWidth: 100
    },
    reason: {
      key: 4,
      field: 'reason',
      tooltip: true,
      label: '申请原因',
      sortable: false,
      showOverflowTooltip: false,
      minWidth: 100
    },
    state: {
      key: 5,
      field: 'state',
      tooltip: false,
      label: '审核状态',
      sortable: true,
      showOverflowTooltip: false,
      minWidth: 100
    }
  },
}
