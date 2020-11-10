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
        ></iframe>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    mounted() {
        // this.onloadIfrme();
        const oIframe = document.getElementById("bdIframe");
        // const deviceWidth = document.documentElement.clientWidth;
        const deviceHeight = document.documentElement.clientHeight;
        // oIframe.style.width = Number(deviceWidth) - 220 + "px"; // 数字是页面布局宽度差值
        oIframe.style.height = Number(deviceHeight) + "px"; // 数字是页面布局高度差
    },
    methods: {
        handleClick() {},
    },
};
</script>
<style lang="less" scoped>
@import "index.less";
</style>
