<template>
  <div class="exportPersonPage">
    <div class="abtn">
      <a href="#" v-html="organizationName+ '&gt;'" style="color:#FC7049"></a>
      <span> 批量导入</span>
    </div>
    <!-- <div class="abtn">
      <el-button size="small" type="primary">批量导入</el-button>
      <el-button size="small">批量导出</el-button>
    </div> -->
    <div class="info">
      <i class="el-icon-info"></i>
      <div class="message">
        <p>提示：为了您更好的体验，批量导入功能展示只支持50条以内的人员数据，如有超出，请分多次导入。</p>
        <p>1.导入表若存在重复人员信息，系统不会过滤，请自行修改删除人员信息。</p>
        <p>2.请严格按照模板填写员工信息，否则会存在信息不准确的人员数据入库。</p>
      </div>
    </div>
    <div class="abtn stepNav">
      <el-steps direction="vertical" :active="1">
        <el-step>
          <div slot="description">
            下载人员信息模板，批量填写人员信息
            <el-button size="mini" type="primary" round @click="downLoad">下载</el-button>
          </div>
        </el-step>
        <el-step>
            <div slot="description">
            上传写好的人员信息表
             <el-form  class="uploadForm" :model="formFile" ref="formFile" enctype="multipart/form-data">
              <el-upload
                  class="uploadMembers"
                  :auto-upload="false"
                  :limit="1"
                  name="file"
                  action="/api/jg_manage/import/userImport"
                  :file-list="fileList">
                  <el-button size="mini" type="primary" round>导入人员</el-button>
              </el-upload>
            </el-form>
          </div>
        </el-step>
      </el-steps>
    </div>
    <div class="submitBtn">
        <el-button  type="primary" round @click="fileSubmit">提交</el-button>
        <el-button  round @click="cancel">返回</el-button>
    </div>

  </div>
</template>
<script>
import { api, urlNames } from '@src/api'
import downloadBinaryFile from '@src/mixins/downloadBinaryFile'
export default {
  data () {
    return {
      formFile: {},
      fileList: [] // 文件列表
    }
  },
  mixins: [downloadBinaryFile],
  props: ['type', 'id', 'organizationName'],
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    downLoad () {
      console.log(this.id, this.type)
      let host = window.location.href.split('#')[0]
      this.downloadBinaryFile(host, '', this.type)
    },
    fileSubmit () {
      let that = this
      let form = that.$refs['formFile'].$el
      let formData = new FormData(form)
      formData.append('file', this.fileList[0])

      if (this.type === 3) {
        formData.append('deptId', this.id)
      }
      if (this.type === 2) {
        formData.append('orgId', this.id)
      }
      api[urlNames['importUser']](formData).then((res) => {
        if (res.status === 0) {
          this.$message.success('导入人员成功')
          this.loading = false
          this.fileList = []
        }
      }, () => {
        this.loading = false
        this.fileList = []
      })
    }


  }
}
</script>
<style lang="less">
@import "index";
</style>
