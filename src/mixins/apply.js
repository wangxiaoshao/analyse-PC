import { mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState(['app']),
    applicationList () {
      return this.app.applicationList
    }
  }
}
