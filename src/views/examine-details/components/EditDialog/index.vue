<template>
  <div class="dic-edit-dialog">
    <el-dialog custom-class="edit-dialog"
               :fullscreen="false"
               :visible.sync="visible"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :show-close="false">
      <div class="dialog-close" @click="closeDialog"><i class="el-icon-close"></i></div>
        <h2 class="dialog-title">{{dialogTitle}}</h2>
        <!--表单-->
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6}"
        v-model="textareaVal"
        :placeholder="`请输入${dialogTitle}`">
      </el-input>
      <el-row :gutter="20">
        <el-col :span="12" :offset=8>
          <div style="margin-top: 20px">
            <el-button  type="primary" @click="passExamine">确认</el-button>
            <el-button @click="closeDialog">取消</el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState, mapMutations } from 'vuex'
import { api, urlNames } from '@src/api'

export default {
  props: ['visible', 'close', 'dialogTitle'],
  components: {},
  data () {
    return {
      textareaVal: ''
    }
  },
  mounted () {
  },
  computed: {
    ...mapState(['app'])
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    },
    passExamine () {
      let obj = {
        message: this.textareaVal,
        auditResult: 0,
        id: this.$route.query.id
      };
      this.$router.push({
        name: 'ApprovedDetail',
        query: { id: obj.id }
      })
      this.$emit('close')
      api[urlNames['sendEditRightsInfo']](obj).then((res) => {
        // this.$emit('refreshList')
        this.$router.push({
          name: 'ApprovedDetail',
          query: { id: obj.id }
        })
      }, (error) => {

      })
    }
  }
}
</script>
