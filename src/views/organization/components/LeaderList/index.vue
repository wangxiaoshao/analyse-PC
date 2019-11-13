<template>
  <div class="leader-list-content">
    <candidate-dialog
      :seleceDialog="selectDialog"
      @dialogReturnMembersInfo="dialogReturnMembersInfo"
      @closeselectMenmber="closeselectMenmber">
    </candidate-dialog>
    <el-dialog
      title="确认删除"
      :visible.sync="dialogVisible"
      width="30%">
      <span>确认删除该领导吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sublimeDelete">确 定</el-button>
      </span>
    </el-dialog>
    <div class="button-wrap" v-if="mainLeaderList.length === 0">
      <el-button type="primary" @click="addMainLeader(true,true,1)">添加主要领导</el-button>
    </div>
    <div class="list-ground">
      <el-table
        :data="mainLeaderList"
        v-loading="loading"
        stripe
        border
        highlight-current-row
        size="medium"
        style="width: 100%">
        <el-table-column prop="description" label="序号" width="60" align="center">
          <template slot-scope="scope">
            <i class="sortBtnDo menu-icon fa fa-bars"  v-if="sortFlag" style="font-size: 25px"></i>
            <span :title="scope" v-else>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <span class="person-pic">
             <img v-if="scope.row.portraitUrl !== ''" :src="scope.row.portraitUrl">
              <img src="@src/common/images/head-pic.png">
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="duty"
          label="职务">
        </el-table-column>
        <el-table-column prop="act" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button @click.native="deleteRow(scope.row)" type="text" size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="content-title">
      单位其他领导
    </div>
    <div class="list-ground">
      <div class="button-wrap">
        <el-button type="primary" @click="addMainLeader(false,true,2)">添加领导</el-button>
       <!-- <el-button @click="sortFlag = true">调整排序</el-button>-->
      </div>
      <!--<div class="sort-do" v-if="sortFlag">
        按住左键上下拖动调整排序
        <a >保存</a>
        <a  @click="sortFlag = false">取消</a>
      </div>-->
      <el-table
        :data="otherLeaderList"
        stripe
        border
        v-loading="loading"
        highlight-current-row
        size="medium"
        id="leaderList"
      >
        <el-table-column prop="description" label="序号" width="60" align="center">
          <template slot-scope="scope">
            <i class="sortBtnDo menu-icon fa fa-bars"  v-if="sortFlag" style="font-size: 25px"></i>
            <span :title="scope" v-else>{{scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <span class="person-pic">
             <img v-if="scope.row.portraitUrl !== ''" :src="scope.row.portraitUrl">
              <img v-else src="@src/common/images/head-pic.png">
            </span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column
          prop="duty"
          label="职务">
        </el-table-column>
        <el-table-column prop="act" label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button @click.native="deleteRow(scope.row)" type="text" size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <!--<el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="page.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import CandidateDialog from '@src/components/CandidateDialog/index'
import Sortable from 'sortablejs'
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
export default {
  mixins: [handleTable],
  props: ['nodeInfo', 'contentId'],
  components: { CandidateDialog },
  data () {
    return {
      dialogVisible: false,
      deleteId: null,
      sortFlag: false,
      list: [],
      userVoList: [],
      personList: [],
      selectDialog: {
        selectMenmberTitle: '选择单位', // 选人组件标题
        selectMenmberFlag: false, // 显示弹窗，
        isAllData: true, // 是否需完整数据-默认为不需要（false，只包含用户id）
        notOnlyPerson: true, // 是否只选人，默认为false（只选人），true可以选择单位和部门
        isSingleSelect: false // 是否为单选框  false为多选（默认），true为单选
      },
      learderType: 1,
      mainLeaderList: [],
      otherLeaderList: []
    }
  },
  created () {
    this.getGrid()
  },
  /* computed: {
    mainLeaderList () {
      return this.list.find(column => +column.leaderType === '1')
    },
    otherLeaderList () {
      return this.list.filter(column => +column.leaderType === '2')
    }
  }, */
  methods: {
    getGrid () {
      let data = {
        nodeType: this.nodeInfo.nodeType,
        nodeId: this.contentId
      }
      this.loading = true
      api[urlNames['findLeaderList']](data).then((res) => {
        this.loading = false
        this.list = res.data
        if (this.list.length === 0) {
          this.mainLeaderList = []
          this.otherLeaderList = []
        } else {
          this.list.forEach((item) => {
            if (item.leaderType === '1' || item.leaderType === 1) {
              this.mainLeaderList.push(item)
            }
            if (item.leaderType === '2' || item.leaderType === 2) {
              this.otherLeaderList.push(item)
            }
          })
        }
      }, () => {
        this.loading = false
        this.list = []
      })
    },
    // 选人弹窗组件返回的人员信息
    dialogReturnMembersInfo (data) {
      // 主要领导1，其他领导2
      if (!JSON.parse(JSON.stringify(data)).length) {
        let obj = {
          uid: JSON.parse(JSON.stringify(data))[0].uid,
          leaderType: this.learderType
        }
        this.personList.push(obj)
      } else {
        JSON.parse(JSON.stringify(data)).forEach((item) => {
          let obj = {
            uid: item.uid,
            leaderType: this.learderType
          }
          this.personList.push(obj)
        })
      }
      // 保存
      if (JSON.parse(JSON.stringify(data)) !== []) {
        api[urlNames['createLeader']]({
          nodeId: this.contentId,
          nodeType: this.nodeInfo.nodeType,
          leaders: this.personList
        }).then((res) => {
          this.$message.success(`添加成功`)
          this.getGrid()
          console.log(res)
        }, (error) => {
          this.$message.error(`保存失败，请重试`)
        })
      }
    },
    // 关闭选人弹窗
    closeselectMenmber () {
      this.selectDialog.selectMenmberFlag = false
    },
    // 打开选人组件
    addMainLeader (single, all, learderType) {
      this.selectDialog.selectMenmberFlag = true
      this.selectDialog.isSingleSelect = single
      this.selectDialog.notOnlyPerson = true
      this.selectDialog.isAllData = all
      this.learderType = learderType
    },
    deleteRow (row) {
      this.dialogVisible = true
      this.deleteId = row.id
    },
    sublimeDelete () {
      api[urlNames['deleteLeader']]({
        id: this.deleteId
      }).then((res) => {
        this.dialogVisible = false
        this.$message.success(`保存成功`)
        this.getGrid()
      }, (error) => {
        this.$message.error(`保存失败，请重试`)
      })
    }
  },
  watch: {
    sortFlag: {
      handler (val) {
        const tbody = document.querySelector('#leaderList tbody')
        const items = this.list
        if (val) {
          Sortable.create(tbody, {
            handle: '.sortBtnDo',
            animation: 150,
            onUpdate: function (evt) {
              console.log('onUpdate.foo:', [evt])
              const newIndex = evt.newIndex
              const oldIndex = evt.oldIndex
              const $li = tbody.children[newIndex]
              const $oldLi = tbody.children[oldIndex]
              if (newIndex > oldIndex) {
                tbody.insertBefore($li, $oldLi)
              } else {
                tbody.insertBefore($li, $oldLi.nextSibling)
              }
              const item = items.splice(oldIndex, 1)
              items.splice(newIndex, 0, item[0])
              this.list = items // 排序后列表
            }
          })
        } else {
          this.sortListFlag = false
          // this.getGrid()
        }
      },
      deep: true
    },
    mainLeaderList: {
      handler (val) {
        console.log(3333, val)
      }
    }
  }
}
</script>

<style lang="less">
  @import "index";
</style>
