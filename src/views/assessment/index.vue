<template>
    <div class="assessment">
        <iframe
            src="http://pinggu.mh.gz.cegn.cn/"
            frameborder="0"
            id="bdIframe"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            width="100%"
            ref="main_page_iframe"
        ></iframe>
    </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  mounted () {
    // this.setIframeHeight();
    this.setIframeHeight1()
    window.open('http://pinggu.mh.gz.cegn.cn/')
    // let that = this;
    // window.onresize = function () {
    //     that.setIframeHeight1();
    // };
  },
  methods: {
    handleClick () {},
    setIframeHeight1 () {
      const oIframe = document.getElementById('bdIframe')
      // const deviceWidth = document.documentElement.clientWidth;
      const deviceHeight = document.documentElement.clientHeight
      // oIframe.style.width = Number(deviceWidth) - 220 + "px"; // 数字是页面布局宽度差值
      oIframe.style.height = Number(deviceHeight) + 'px' // 数字是页面布局高度差
    },
    setIframeHeight () {
      const iframe = document.getElementById('bdIframe')
      try {
        const bHeight = iframe.contentWindow.document.body.scrollHeight
        const dHeight =
                    iframe.contentWindow.document.documentElement.scrollHeight
        const height = Math.min(bHeight, dHeight)
        iframe.height = height + 20
      } catch (ex) {}
    }
  }
}
</script>
<style lang="less" scoped>
@import "index.less";
</style>
