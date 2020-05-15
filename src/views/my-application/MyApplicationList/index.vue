<template>
    <div class="site-module mod-dictionary">
        <!--操作row-->
        <!--人员调出弹窗-->
        <select-members
            :seleceDialog="selectDialog"
            @dialogReturnMembersInfo="dialogReturnMembersInfo"
            @closeselectMenmber="closeselectMenmber"
        ></select-members>

        <el-row class="operator-row">
            <el-col :span="24">
                <el-row :gutter="10">
                    <!--<el-col :span="6">-->
                    <!--<el-select v-model="searchQuery.id" filterable clearable @change="search" placeholder="单位">-->
                    <!--<el-option-->
                    <!--v-for="item in areaList"-->
                    <!--:key="item.id"-->
                    <!--:label="item.name"-->
                    <!--:value="item.code">-->
                    <!--</el-option>-->
                    <!--</el-select>-->
                    <!--</el-col>-->
                    <el-col :span="8">
                        <!--<el-input placeholder="请输入关键字搜索" v-model="searchQuery.keyword" clearable @change="getGrid">-->
                        <!--<el-button slot="append" icon="el-icon-search" @click="search"></el-button>-->
                        <!--</el-input>-->
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <!--表格-->
        <site-table
            :tableConfig="tableConfig"
            :tableHeight="tableHeight"
            :operateWidth="operateWidth"
            :operate="operate"
            :tableData="tableData"
        >
            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    <span v-show="scope.row.auditState === 1" class="text-green"
                        >已审核</span
                    >
                    <span v-show="scope.row.auditState !== 1" class="text-red"
                        >待审核</span
                    >
                </template>
            </el-table-column>
            <template slot-scope="{ slotScope }" slot="operate">
                <el-button
                    size="mini"
                    type="text"
                    @click="goConfig(slotScope.row)"
                    >查看明细</el-button
                >
            </template>
        </site-table>
        <!--分页-->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="page.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
        ></el-pagination>
    </div>
</template>

<script type="text/ecmascript-6">
import handleTable from '@src/mixins/handle-table'
import SiteTable from '@src/components/SiteTable/index.vue'
import { api, urlNames } from '@src/api'
import tableConfig from './tableConfig'
import SelectMembers from '@src/components/SelectMembers/index'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { SiteTable, SelectMembers },
  mixins: [handleTable],
  data () {
    return {
      tableConfig,
      calloutFlag: false,
      orgName: '',
      depName: '',
      selectDialog: {
        selectMenmberTitle: '选择调出单位或内设机构', // 选人组件标题
        selectMenmberFlag: false, // 显示弹窗，
        isAllData: true, // 是否需完整数据-默认为不需要（false，只包含用户id）
        notOnlyPerson: false, // 是否选人，默认为false（只选人）
        isSingleSelect: false, // 是否为单选框  false为多选（默认）-人员单选
        isSingleOrgSelect: true, // 是否为单选框  false为多选（默认），true为单选(isOnlyOrg为true时内设机构/单位单选)
        isOnlyOrg: true
      },
      // 人员调出表单
      formCallout: {
        identityId: '',
        uid: '',
        deptId: '',
        orgId: '',
        reason: ''
      },
      rulesCallou: {
        orgId: [{ required: true, message: '请选择调出单位', trigger: 'blur' }]
      },
      searchQuery: {
        id: '',
        status: '',
        keyword: ''
      },

      areaList: [
        {
          id: 1,
          code: '1',
          name: '单位'
        },
        {
          id: 2,
          code: '2',
          name: '内设机构'
        },
        {
          id: 3,
          code: '3',
          name: '人员'
        }
      ],
      tableData: [],
      tableHeight: null,
      operateWidth: 100,
      tableCheckbox: true,
      operate: true
    }
  },
  computed: {
    ...mapState(['application', 'examine', 'app'])
  },
  created () {
    if (this.$route.query.type === 'back') {
      this.page = Object.assign(this.page, this.application.page)
      this.searchQuery = Object.assign(
        this.searchQuery,
        this.examine.searchQuery
      )
      this.tableData = Object.assign(this.tableData, this.examine.tableData)
    } else {
      this.SET_APPLICATION_PAGE({})
      this.SET_EXAMINE_SEARCH_QUERY({})
      this.SET_EXAMINE_TABLEDATA({})
      this.SET_EXAMINE_DETAIL({})
      this.SET_EXAMINE_BACKPATH({})
    }
    this.initQuery()
    this.getGrid()
  },
  methods: {
    ...mapMutations([
      'SET_APPLICATION_PAGE',
      'SET_EXAMINE_TABLEDATA',
      'SET_EXAMINE_DETAIL',
      'SET_EXAMINE_SEARCH_QUERY',
      'SET_EXAMINE_BACKPATH'
    ]),
    initQuery () {
      let keys = Object.assign({}, this.$route.query)
      let len = keys.length
      for (let i = 0; i < len; i++) {
        let key = keys[i]
        let value = this.$route.query[key]
        if (this.page[key] !== undefined) {
          this.page[key] = value
        } else if (this.searchQuery[key] !== undefined) {
          this.searchQuery[key] = value
        }
      }
    },
    // 提交调出
    submitFormCallout (formCallout) {
      this.$refs[formCallout].validate(valid => {
        if (valid) {
          api[urlNames['calloutUser']](this.formCallout).then(
            res => {
              this.$message.success(`调出成功`)
              this.calloutFlag = false
              this.getGrid()
              this.fromInit()
              this.formCallout.deptId = this.formCallout.orgId = ''
              this.orgName = this.depName = ''
            },
            () => {}
          )
        }
      })
    },
    // 选人弹窗组件返回的人员信息
    dialogReturnMembersInfo (data) {
      console.log(data)
      if (data[0].nodeType === 2) {
        this.formCallout.orgId = data[0].bindId
        this.orgName = data[0].name
      }
      if (data[0].nodeType === 3) {
        this.formCallout.deptId = data[0].bindId
        api[urlNames['findDepartmentById']]({
          id: data[0].bindId
        }).then(
          res => {
            this.formCallout.orgId = res.data.orgId
            this.orgName = res.data.orgName
            this.depName = res.data.name
          },
          // eslint-disable-next-line handle-callback-err
          error => {}
        )
      }
    },
    // 关闭选人弹窗
    closeselectMenmber () {
      this.selectDialog.selectMenmberFlag = false
    },
    addMainLeader () {
      this.selectDialog.selectMenmberFlag = true
      this.selectDialog.isSingleSelect = false
      this.selectDialog.notOnlyPerson = false
      this.selectDialog.isSingleOrgSelect = true
      this.selectDialog.isOnlyOrg = true
      this.selectDialog.isAllData = true
      this.$emit('clear')
    },
    // 调出
    calloutDialog () {
      this.formCallout.deptId = this.app.option.user.deptId
      this.formCallout.identityId = this.app.option.user.identityId
      this.formCallout.uid = this.app.option.user.uid
      this.formCallout.orgId = this.app.option.user.orgId
      this.calloutFlag = true
      this.$emit('cancel', false)
    },
    search () {
      this.$nextTick(() => {
        this.page.current = 1
        this.getGrid()
      })
    },
    getGrid () {
      this.loading = true
      let data = {
        page: this.page.current,
        limit: this.page.limit
      }
      let keys = Object.keys(this.searchQuery)
      let len = keys.length
      for (let i = 0; i < len; i++) {
        let key = keys[i]
        let value = this.searchQuery[key]
        if (typeof value !== 'number') {
          if (value) {
            data[key] = value
          }
        } else {
          data[key] = value
        }
      }
      api[urlNames['getMyApplyAuditList']](data).then(
        res => {
          this.loading = false
          this.tableData = res.data
          this.page.total = res.total
        },
        () => {
          this.loading = false
          this.tableData = []
          this.page.total = 0
        }
      )
    },
    goConfig (row) {
      this.SET_APPLICATION_PAGE(this.page)
      this.SET_EXAMINE_SEARCH_QUERY(this.searchQuery)
      this.SET_EXAMINE_TABLEDATA(this.tableData)
      this.SET_EXAMINE_DETAIL(row)
      this.SET_EXAMINE_BACKPATH(this.$route.name)
      this.$router.push({
        name: 'MyApplicationDetail',
        params: {
          id: row.id,
          type: row.type
        }
      })
    }
  }
}
</script>
<style lang="less">
@import "index";
</style>
