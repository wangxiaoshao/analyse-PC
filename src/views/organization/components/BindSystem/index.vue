<!-- ------------------------------------------
 * 关联系统+展示
 * 一个回显、一个创建账号关联使用
 * 有一个问题、在 list 中有的数据，而在 appList 中没有这个数据
 ------------------------------------------ -->

<template>
  <div class="choose-content">
    <el-popover
      ref="popover"
      width="700"
      trigger="click"
      popper-class="system-popover"
      placement="bottom-start"
      v-model="showPopover"
    >
      <div class="app-content">
        <el-checkbox-group v-model="selectedIds" >
          <el-checkbox
            class="app-check"
            v-for="item in appList"
            border
            :label="item.appId"
            :title="item.name"
            style="width: 132px;overflow: hidden;margin: 10px"
            :key="item.appId">{{item.name}}</el-checkbox>
        </el-checkbox-group>
        <div class="popover-footer">
          <!-- <el-button type="primary" @click="sendApp">确定</el-button> -->
          <el-button type="primary" @click="handlePopoverConfirm" v-if="appList.length">确定</el-button>
          <el-button @click="showPopover = false">取消</el-button>
        </div>
      </div>
      <el-button  class="choose-btn" slot="reference" v-if="!disabledFlag && this.$route.name !== 'PersonDetail'" >选择关联系统</el-button>
    </el-popover>
    <div>
       <el-tag
          type="info"
          v-for="(tag, index) in slectedList"
          closable
          :disable-transitions="false"
          :key="index"
          style="margin: 5px"
          @close="handleClose(tag, index)">
          {{tag.appName}}
        </el-tag>
        <div style="color: #58a4f3;font-size: 10px" v-if="isCreate">请先填写账号和密码，否则关联系统无效</div>
    </div>
  </div>
</template>

<script>
import { api, urlNames } from '@src/api'
let vm = null
export default {
  // props: ['disabledFlag', 'userAccount'],
  props: {
    disabledFlag: { // 是否禁用
      type: Boolean,
      default: false
    },
    list: { // 显示的列表、其实就是用户已经选择的列表
      type: Array,
      // required: true
      default: () => []
    },
    isCreate: { // 是否创建账号的时候
      type: Boolean,
      default: false
    },
    sysIndex: {
      type: Number
    }
  },
  data () {
    return {
      appList: [], // 应用列表
      showPopover: false, // 是否显示 Popover
      selectedIds: [...this.list.map(item => item.appId)], // checkbox 选择的id列表
      slectedList: [...this.list] ,// 选中的列表
      isChange:false
    }
  },
  created () {
    vm = this
    this.getAppList()
  },
  watch: {
    list: {
      handler (val) {
        vm.selectedIds = val.map(item => item.appId)
        vm.changeSlectedList()
      }
    },
    selectedIds:{
       handler (newValue, oldValue) {
        console.log(newValue)
        if(newValue.length>0&&!this.isCreate){
          this.isChange=true
          console.log('this.isChange:',this.isChange)
        }
      }
    }
  },
  methods: {
    // 获取 app 的列表
    getAppList () {
      api[urlNames['getAppList']]().then((res) => {
        this.appList = res.data.map(item => {
          return {
            ...item,
            appId: Number(item.id),
            appName: item.name
          }
        })
      }, () => {})
    },
    // 改变列表
    changeSlectedList () {
      let selectedIds = this.selectedIds
      this.slectedList = this.appList.filter(app => selectedIds.includes(app.appId))
    },

    // 改变选择列表的id
    changeSelectedIds () {
      this.selectedIds = this.slectedList.map(item => item.appId)
    },

    // 点击关闭按钮
    handleClose (item, index) {
      if (this.isCreate || !item.accountId) { // 创建账号关联、或者没有 accountId
      // alert(111)
        this.slectedList.splice(index, 1)
        this.changeSelectedIds()
      } else {
        //  这个是回显的，就是用户已经选择了，后台已经保存了的
        this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api[urlNames['deleteAppBindAccount']]({
          accountId: item.accountId,
          appId: item.appId
        }).then((res) => {
          if (res.status === 0) {
            this.$message.success('删除成功')
            this.slectedList.splice(index, 1)
            this.changeSelectedIds()
          }
        }).catch(() => {
          this.$message.success('删除失败')
        })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })

       
      }
    },

    // 关联系统 Popover 点击确定
    handlePopoverConfirm () {
      this.changeSlectedList()
      let arr = this.selectedIds.map(id => id + '')
      this.$emit('app-change', arr, this.sysIndex,this.isChange)
      this.showPopover = false
    },

    // 打开 Popover
    openPopover () {
      this.showPopover = true
    }
  }

}
</script>

<style lang="less"  scoped>
  @import "index";
</style>
