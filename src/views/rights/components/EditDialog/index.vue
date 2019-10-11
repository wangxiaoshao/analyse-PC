<template>
  <div class="dic-edit-dialog">
    <el-dialog custom-class="edit-dialog"
               :fullscreen="true"
               :visible.sync="visible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false">
      <div class="dialog-close" @click="closeDialog"><i class="el-icon-close"></i></div>
      <el-scrollbar :style="scrollStyle">
        <h2 class="dialog-title">权限管理</h2>
        <!--表单-->
        <el-form class="edit-form" :model="editForm" :rules="rules" ref="editForm">
          <el-form-item label="地区" prop="areaId" :label-width="formLabelWidth">
            <el-select v-model="editForm.areaId"
                       multiple
                       filterable
                       clearable
                       placeholder="请选择地区">
              <el-option
                v-for="item in areaList"
                :key="item.id"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限" prop="type" :label-width="formLabelWidth">
            <el-select v-model="editForm.type"
                       filterable
                       clearable
                       placeholder="请选择活动权限">
              <el-option label="超级管理员" value="1"></el-option>
              <el-option label="管理员" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管理员选择" :label-width="formLabelWidth" prop="uname">
            <el-input v-show="current" v-model="editForm.uname" disabled readonly></el-input>
            <el-select
              v-show="!current"
              v-model="editForm.uid"
              filterable
              remote
              :disabled="current ? true : false"
              reserve-keyword
              placeholder="请选择管理员"
              :remote-method="remoteMethod"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                @click.native="unameChange(item)"
                :value="item.id">
                <span style="float: left">{{ item.name}}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.department}}</span>
              </el-option>
            </el-select>
            </el-form-item>
          <div class="confirm-btn">
            <el-button type="danger" @click="submitForm('editForm')">确 定</el-button>
          </div>
        </el-form>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState, mapMutations } from 'vuex'
  import { api, urlNames } from '@src/api';

  export default {
    props: ['current', 'refreshList', 'visible', 'close', 'parent'],
    components: {},
    data() {
      var validateAreaName = (rule, value, callback) => {
        if (value.length > 0) {
          callback();
        } else {
          callback(new Error('请选择地区'));
        }
      };
      return {
        formLabelWidth: '100px',
        defaultForm: {
          areaId: [],
          type: '',
          uname: '',
          uid: '',
        },
        currentSelect: {},
        rules: {
          areaId: [
            { validator: validateAreaName, trigger: 'blur' }
          ],
          type: [
            {required: true, message: '', trigger: 'blur'},
            {min: 1, max: 50, message: '', trigger: 'blur'}
          ],
          uid: [
            {required: true, message: '', trigger: 'blur'},
          ],
        },
        filterText: '',
        areaList: [],
        options: [],
      };
    },
    mounted () {
      this.getAreaList ()
    },
    computed: {
      ...mapState(['app']),
      editForm() {
        if (this.current) {
          if (typeof this.current.areaId === 'string') {
            let arr = this.current.areaId.split(",")
            this.current['areaId'] = arr;
          }
          return this.current
        } else {
          return this.defaultForm
        }
      },
      scrollStyle () {
        return {
          height: this.$store.state.app.windowHeight - 30 + 'px'
        }
      }
    },
    methods: {
      remoteMethod(query) {
        api[urlNames['geMtmemberSearch']]({
          'keyword': query,
          'types': 4,
        }).then((res) => {
          this.loading = false;
          this.options = res.result
        }, () => {
          this.options = [];
        })
      },
      unameChange (val) {
        console.log(val)
        // this.editForm.uname = val.name
        this.editForm.name = val.name
      },
      getAreaList () {
        api[urlNames['getAreaList']]().then((res) => {
          this.areaList = res.data
        })
      },
      closeDialog () {
        this.$refs.editForm.resetFields();
        this.$emit('close')
      },
      submitForm (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            let data = new FormData()
            let keys = Object.keys(this.editForm)
            let len = keys.length
            for (let i = 0; i < len; i++) {
              let key = keys[i]
              let value = this.editForm[key]
              if (value) {
                data.append(key, value)
              }
            }
            api[urlNames['sendEditRightsInfo']](data).then((res) => {
              this.$message({
                message: this.current ? '修改成功' : '添加成功',
                type: 'success'
              })
              this.$emit('refreshList')
              this.closeDialog()
            }, (error) => {

            })
          }
        })
      }
    },
  }
</script>
