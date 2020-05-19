<template>
  <div class="wordDetial">
    <div class="header-title">文章标题</div>
    <div class="time">2020年03月12日17:00</div>
    <div class="content-box">
      <div class="article">
          一、材料清单<br>
          1. 本人身份证、学生证或工作证等证件。<br>
          2. 笔试准考证。<br>
          3. 考试报名表（贴好照片，如实、详细填写个人学习、工作经历，时间必须连续，并注明各学习阶段是否在职学习，取得何种学历和学位）。<br>
          4. 本科、研究生各阶段学历、学位证书以及所报职位要求的外语等级证书、职业资格证书等。<br>
          5. 报考职位所要求的工作经历有关证明材料。在党政机关、事业单位工作过的考生，需提供单位人事部门出具的相关工作经历材料，并注明起止时间和工作地点；在其他经济组织、社会组织等单位工作过的考生，需提供相应劳动合同或缴纳社保材料的复印件。
      </div>
      <div class="footer">
        <p class="articleForm">
          <span>文章来源：<a href="">《国密改造》</a></span>
        </p>
        <p class="saveArticle">
          <el-button type="primary">保存该文档</el-button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import handleBreadcrumb from '@src/mixins/handle-breadcrumb.js'
export default {
  mixins: [handleBreadcrumb],
  name: 'WordDetial',
  data () {
    return {

    }
  },
  mounted () {
    this.pushBreadcrumb({
      name: '文章详情',
      parent: {
        path: `/word-center`
      }
    })
  }

}
</script>
<style lang="less" scoped>
  @import './index';
</style>
