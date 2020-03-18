<template>
  <div  class="msgSet">
    <div  class="module">
      <div class="header">单位信息确认短信模板</div>
      <div  class="content">
        <el-row>
          <el-col :span="8">
            <el-input type="textarea"  v-model="orgMsg" :autosize="{ minRows: 3, maxRows: 4}"></el-input>
          </el-col>
          <el-col :span="12">
            <div class="msg">
              <p>每月单位信息需要确认时发送短信。</p>
              <p>可用占位符:<a href="">{单位名称}</a>，<a href="">{月份}</a>。</p>
            </div>
          </el-col>
        </el-row>
        <el-button type="primary" @click="saveMsg" >保存</el-button>

      </div>

    </div>
    <div class="module">
      <div class="header">信息审核模板</div>
       <div  class="content">
        <el-row>
          <el-col :span="8">
            <el-input type="textarea" v-model="auditMsg" :autosize="{ minRows: 3, maxRows: 4}"></el-input>
          </el-col>
          <el-col :span="12">
            <div class="msg">
              <p>审核管理员有审核事项时，给相关人员发送短信。</p>
              <p>可用占位符:<a href="javaScript:void(0)">{管理员名称}</a>，<a href="javaScript:void(0)">{事件详情}</a>。</p>
            </div>
          </el-col>
        </el-row>
        <el-button type="primary" @click="saveMsg">保存</el-button>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      orgMsg: '',
      auditMsg: ''

    }
  },
  methods: {
    saveMsg () {

    }
  }
}
</script>
<style lang="less" scoped>
@import 'index.less';
</style>
