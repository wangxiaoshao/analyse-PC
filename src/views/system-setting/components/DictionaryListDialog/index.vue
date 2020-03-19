<template>
  <div class="dic-edit-dialog">
    <el-dialog :title="dialogTitle"
               align="center"
               :fullscreen="false"
               :visible.sync="visible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false">
      <div class="dialog-close" @click="closeDialog('form')"><i class="el-icon-close"></i></div>
        <div>
          <el-form :inline="true" :model="form" class="demo-form-inline" :rules="rules" ref="form">
            <el-form-item label="值" prop="value">
              <el-input v-model="form.value"  type="number" min="1" placeholder="请输入字典值" clearable></el-input>
            </el-form-item>
            <el-form-item label="名称"  prop="text" >
              <el-input v-model="form.text" placeholder="请输入名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addDic('form')" v-show="hasRight('dictItemCreate')">创建</el-button>
              <!--<el-button type="primary" @click="addDic('form')">创建</el-button>-->
            </el-form-item>
          </el-form>
        </div>
        <el-row :gutter="20">
          <el-col :span="18" :offset="4">
            <el-table
              :data="tableData"
              max-height="200"
              style="width: 100%">
              <el-table-column
                fixed
                align="center"
                prop="value"
                label="值"
                width="180">
              </el-table-column>
              <el-table-column
                fixed
                align="center"
                prop="text"
                label="名称"
                width="180">
              </el-table-column>
              <el-table-column
                fixed
                align="center"
                prop="value"
                width="180"
                label="操作">
                <template slot-scope="scope">
                  <span class="tag-icon-operate fa fa-trash-o delete" style="color:red;cursor: pointer;"
                    @click="deleteDic(scope.$index, scope.row)"></span>
                  <!-- <el-button
                  size="mini"
                  type="danger"
                  @click="deleteDic(scope.$index, scope.row)">删除</el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      <el-row :gutter="20" :style="{marginTop: '20px'}">
        <el-col :span="12" :offset="6">
          <el-button
            type="primary"
            @click="addAllDic"
            :disabled="foundDicList && foundDicList.length === 0" v-show="hasRight('dictItemCreate')">批量添加</el-button>
          <el-button @click="closeDialog('form')" :style="{marginLeft: '60px'}">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
import hasRight from '@src/mixins/has-right'
import { api, urlNames } from '@src/api'

export default {
  props: ['visible', 'close', 'dialogTitle', 'dictionaryType'],
  components: {},
  mixins: [hasRight],
  data () {
    return {
      dynamicTags: ['正厅级', '副厅级'],
      inputVisible: false,
      inputValue: '',
      stateValue: '',
      form: {
        text: '',
        value: ''
      },
      isShow: false,
      formLabelWidth: '120px',
      tableData: [],
      foundDicList: [],
      newAddList: [],
      rules: {
        text: { type: 'string', required: true, message: '字段名称未填写' },
        value: [
          { required: true, message: '字段值未填写' },
          { validator: (rule, value, callback) => {
            let ok = true
            let msg = ''

            this.tableData.forEach((item) => {
              if (parseInt(value) === item.value) {
                ok = false
                msg = '重复的值'
              }
            })

            if (!ok) {
              return callback(new Error(msg))
            } else {
              return callback()
            }
          },
          trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  watch: {
    visible: function (currentVisible) {
      if (currentVisible) {
        this.foundDicList = []
        this.getDicByTypeList()
      }
    }
  },
  computed: {
    ...mapState(['app']),
    scrollStyle () {
      return {
        maxHeight: this.$store.state.app.windowHeight / 2 + 'px'
      }
    }
  },
  methods: {
    getDicByTypeList () {
      let type = {
        type: this.dictionaryType
      }
      api[urlNames['getDicListByType']](type).then((res) => {
        this.tableData = res.data
      }, () => {
        this.tableData = []
      })
    },
    addDic (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.value = parseInt(this.form.value)
          let addItem = JSON.parse(JSON.stringify(this.form))
          this.foundDicList.push(addItem)
          this.tableData.push(addItem)
          this.$refs[form].resetFields()
        }
      })
    },
    addAllDic () {
      let paraems = {
        type: this.dictionaryType,
        data: [...this.foundDicList]
      }
      api[urlNames['addDictionary']](paraems).then((res) => {
        if (res && res.status === 0) {
          this.$emit('refreshList')
          this.closeDialog('form')
          this.$message.success(`批量添加成功`)
        }
      }, () => {
        this.foundDicList = []
        this.$message.error(`字典值不可重复`)
        this.closeDialog('form')
      })
    },
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    passExamine () {
      this.dialogVisible = true
    },
    closeDialog (form) {
      this.$refs[form].resetFields()
      this.$emit('close', 'dicDialogVisible')
    },
    deleteDic (index, rowData) {
      let data = {
        dictItemIds: [rowData.id],
        dictId: this.dictionaryType
      }
      api[urlNames['deleteDictItem']](data).then(
        res => {
          if (res && res.status === 0) {
            this.$message.success(`删除成功`)
            this.getDicByTypeList()
          } else {
            this.$message.error(`删除失败`)
          }
        },
        () => {

        }
      )
    }
  }
}
</script>
<style lang="less">
  @import "index";
</style>
