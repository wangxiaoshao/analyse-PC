<template>
  <div class="dic-edit-dialog">
    <el-dialog :title="dialogTitle"
               :fullscreen="false"
               :visible.sync="visible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false">
      <div class="dialog-close" @click="closeDialog('form')"><i class="el-icon-close"></i></div>
      <el-scrollbar :style="scrollStyle">
        <div>
          <el-form :inline="true" :model="form" class="demo-form-inline" :rules="rules" ref="form">
            <el-form-item label="名称"  prop="text" >
              <el-input v-model="form.text" placeholder="请输入名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="值" prop="value">
              <el-input v-model="form.value" placeholder="请输入字典值" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addDic('form')">{{type || '创建'}}</el-button>
              <!--<el-button type="primary" @click="addDic('form')">创建</el-button>-->
            </el-form-item>
          </el-form>
          <template>
            <el-table
              :data="tableData"
              height="200"
              style="width: 100%">
              <el-table-column
                fixed
                align="center"
                type="index"
                :index="indexMethod">
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
                label="值"
                width="180">
              </el-table-column>
            </el-table>
          </template>
        </div>
      </el-scrollbar>
      <el-row :gutter="20" :style="{marginTop: '20px'}">
        <el-col :span="12" :offset="8">
          <el-button type="primary" @click="addAllDic">批量添加</el-button>
          <el-button @click="closeDialog('form')">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapMutations } from 'vuex'
import { api, urlNames } from '@src/api'

export default {
  props: ['visible', 'close', 'dialogTitle', 'dictionaryType'],
  components: {},
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(' '))
      } else {
        callback()
      }
    }
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
        text: [{ validator: checkAge, trigger: 'blur' }],
        value: [{ validator: checkAge, trigger: 'blur' }]
      }
    }
  },
  mounted () {
  },
  computed: {
    ...mapState(['app']),
    scrollStyle () {
      return {
        maxHeight: this.$store.state.app.windowHeight / 2 + 'px'
      }
    },
    type () {
      if (this.dictionaryType) {
        this.getDicByTypeList()
        return '创建'
      } else {
        return '创建'
      }
    },
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
    addAllDic () {
      let paraems = {
        tyep: this.dictionaryType,
        data: [...this.foundDicList]
      }
      console.log(paraems)
      api[urlNames['addDictionary']](paraems).then((res) => {
          console.log(res)
      }, () => {
        this.foundDicList = []
      })
    },
    indexMethod (index) {
      return index + 1
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
    addDic (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let addItem = JSON.parse(JSON.stringify(this.form))
          this.foundDicList.push(addItem)
          this.tableData.push(addItem)
          this.$refs[form].resetFields()
        }
      })
    }
  }
}
</script>
<style lang="less">
  @import "index";
</style>
