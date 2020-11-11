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
    data() {
        return {};
    },
    mounted() {
        const oIframe = document.getElementById("bdIframe");
        // const deviceWidth = document.documentElement.clientWidth;
        const deviceHeight = document.documentElement.clientHeight;
        // oIframe.style.width = Number(deviceWidth) - 220 + "px"; // 数字是页面布局宽度差值
        oIframe.style.height = Number(deviceHeight) + "px"; // 数字是页面布局高度差
    },
    methods: {
        handleClick() {},
        setIframeHeight(id) {
            var iframe = document.getElementById("bdIframe");
            try {
                var bHeight = iframe.contentWindow.document.body.scrollHeight;
                var dHeight =
                    iframe.contentWindow.document.documentElement.scrollHeight;
                var height = Math.min(bHeight, dHeight);
                iframe.height = height + 20;
            } catch (ex) {}
        },
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
