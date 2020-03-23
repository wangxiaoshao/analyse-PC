/**
 * 
 * 返回提示信息
 */
export default {
  data () {
    return {
      isChange:false
    }
  },
  methods: {
    addWatch(newDate,oldDate){
      return JSON.stringify(newDate) !== JSON.stringify(oldDate)
   },
      goBackDilog (cb,ruleForm) {
          this.$confirm('内容已修改, 是否保存?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if(ruleForm){
              cb(ruleForm)
            }else{
              cb()
            }
            this.isChange=false
          }).catch(() => {
            this.isChange=false
            this.$router.go(-1)
          });
        }
  }
}