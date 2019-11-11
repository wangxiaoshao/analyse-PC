export default {
  data () {
    return {}
  },
  methods: {
    // 打开编辑节点
    openEditNode (row) {
      this.$router.push({
        name: 'NodeEdit',
        params: {
          id: row.id
        }
      })
    },
    // 打开编辑单位
    openEditUnit (row) {
      this.$router.push({
        name: 'UnitEdit',
        params: {
          id: row.id
        }
      })
    },
    // 打开编辑部门
    openDepartmentEdit (row) {
      this.$router.push({
        name: 'DepartmentEdit',
        params: {
          id: row.bindId
        }
      })
    }
  }
}
