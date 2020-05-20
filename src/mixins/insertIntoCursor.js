/**
 * mixin
 * 处理在光标位置插入文本等操作
 */

export default {
    data() {
        return {};
    },
    methods: {
        insertTextIntoCursor(text) {
            document.execCommand("insertText", false, text);
        },
    },
};
