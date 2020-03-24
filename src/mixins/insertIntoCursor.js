/**
 * mixin
 * 处理在光标位置插入文本等操作
 */

export default {
  data () {
    return {}
  },
  methods: {
    insertTextInfoCursor (text) {
      document.execCommand('insertText', false, text)
    }
  }
}
