<template>
  <div class='PersonInfo'>
    <el-form :inline="true" label-position="left"  label-width="70px" :model="personInfoList">
      <el-row>
        <el-col :span="12"  >
      <el-form-item label="姓名">
        <el-input v-model="personInfoList.name" placeholder="暂无数据"  disabled></el-input>
      </el-form-item>
      <el-form-item label="手机号码" >
        <div  style="position:relative">
          <span> {{ phoneState ? personInfoList.mobile : hideMobile(personInfoList.mobile) }}</span>
          <span style="color:red" class="find"  @click="findMobile" v-if="showBtn">{{ phoneState ? "隐藏" : "查看" }}</span>
        </div>
      </el-form-item>
      <el-form-item label="座机号码">
        <el-input v-model="personInfoList.num"   placeholder="暂无数据" disabled></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="12">
       <el-form-item label="职务">
        <el-input v-model="personInfoList.duty"  placeholder="暂无数据" disabled></el-input>
      </el-form-item>
      </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'personInfo',
  props: ['personInfoList','phoneState'],
  data(){
    return {
      state:'',
      showBtn:true,
      personInfoValue:this.personInfoList,
      val:''

    }
  },
  methods:{
    findMobile(){
      this.$emit('showPhoneState',true)
    },
     hideMobile(phone){
      if(phone !==''){
        this.showBtn=true
        return (phone+'').replace(/^(.{3})(?:\d+)(.{4})$/,"$1****$2")
      }else{
        this.showBtn=false
        return  '暂无数据'
      }
    },
    
  },
  
}
</script>
<style lang="less">
@import 'index.less';;

</style>
