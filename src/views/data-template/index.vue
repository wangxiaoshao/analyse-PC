<template>
    <div class="data-template">
        <div style="margin-bottom: 10px;">
            <el-button size="small" type="primary" style="margin-right: 10px;"
                >模板</el-button
            >
            <el-select
                filterable
                v-model="templateId"
                placeholder="请选择"
                @change="templateNameChange"
            >
                <el-option
                    v-for="item in templateNameList"
                    :key="item.id"
                    :label="item.modelName"
                    :value="item.id"
                >
                </el-option>
            </el-select>
        </div>
        <div class="table-box">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in templateList" :key="item.id">
                    <div class="template-item">
                        <p class="title" :title="item.modelName">
                            {{ item.modelName }}
                        </p>
                        <div class="content">
                            <img
                                :src="
                                    item.type === 'doc'
                                        ? url3
                                        : item.type === 'txt'
                                        ? url2
                                        : item.type === 'xlsx'
                                        ? url1
                                        : url4
                                "
                                alt=""
                            />
                        </div>
                        <div class="template-footer">
                            <el-button
                                size="mini"
                                type="text"
                                style="float: left;"
                                @click="fileView(item.id)"
                                >在线预览</el-button
                            >
                            <el-button
                                size="mini"
                                type="text"
                                style="float: right;"
                                @click="downloadTemplate(item.id)"
                                >下载</el-button
                            >
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-sizes="[8]"
            :page-size="page.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
        ></el-pagination>
    </div>
</template>
<script>
import { api, urlNames } from '@src/api'
import handleTable from '@src/mixins/handle-table'
import downloadBinaryFile from '@src/mixins/downloadBinaryFile'
export default {
  mixins: [handleTable, downloadBinaryFile],
  data () {
    return {
      templateId: '',
      templateList: [],
      templateNameList: [],
      url1: require('@src/common/images/excel.png'),
      url2: require('@src/common/images/txt.png'),
      url3: require('@src/common/images/word.png'),
      url4: require('@src/common/images/v2_qb1aza.svg')
    }
  },
  mounted () {
    this.getTemplateTypeList()
    this.getGrid()
  },
  methods: {
    getTemplateTypeList () {
      api[urlNames.getTemplateName]().then((res) => {
        if (res.status === 0) {
          this.templateNameList = res.data
        }
      })
    },
    templateNameChange (id) {
      this.templateId = id
      this.getGrid()
    },
    getGrid () {
      const data = {
        page: this.page.current,
        pageSize: 8,
        templateId: this.templateId
      }
      const reg1 = RegExp(/doc/)
      const reg2 = RegExp(/xlsx/)
      const reg3 = RegExp(/txt/)
      api[urlNames.getTemplateList](data).then(
        (res) => {
          res.data.forEach((item) => {
            if (reg1.test(item.modelName)) {
              item.type = 'doc'
            } else if (reg2.test(item.modelName)) {
              item.type = 'xlsx'
            } else if (reg3.test(item.modelName)) {
              item.type = 'txt'
            } else {
              item.type = 'pdf'
            }
          })
          this.templateList = res.data
          this.page.total = res.total
        },
        () => {
          this.templateList = []
          this.page.total = 0
        }
      )
    },
    downloadTemplate (id) {
      const params = { id }
      this.downloadBinaryFile('template', params)
    },
    fileView (id) {
      api[urlNames.modelFileView]({ id }).then((res) => {
        console.log(res)
        if (res) {
          window.open(res)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "index.less";
</style>
