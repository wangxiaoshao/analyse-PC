<template>
  <div>数据统计</div>
</template>

<script type="text/ecmascript-6">
import handleTable from '@src/mixins/handle-table'
import { api, urlNames } from '@src/api'
import { mapState, mapMutations } from 'vuex'

export default {
  components: { },
  mixins: [handleTable],
  data () {
    return {

    }
  },
  computed: {
    ...mapState(['application'])
  },
  created () {

  },
  methods: {
    ...mapMutations(['SET_APPLICATION_PAGE', 'SET_APPLICATION_SEARCH_QUERY']),
  }
}
</script>
<style lang="less">
  @import "./index";
</style>


