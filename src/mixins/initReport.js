export default {
    data() {
        return {};
    },
    methods: {
        initReportPage(Iframe) {
            var ifr = document.getElementById(Iframe).contentWindow;
            var sendMessage = function () {
                if (window.postMessage) {
                    if (window.addEventListener) {
                    } else if (window.attachEvent) {
                        window.attachEvent("onmessage", function (e) {});
                    }
                    return function (data) {
                        console.log(data, 333);
                        ifr.postMessage(data, "*");
                    };
                } else {
                    var hash = "";
                    setInterval(function () {
                        if (window.name !== hash) {
                            hash = window.name;
                        }
                    }, 200);
                    return function (data) {
                        console.log(data, 444);
                        ifr.name = data;
                    };
                }
            };
            window.sendMessage = sendMessage();
        },
        send(msg) {
            window.sendMessage(msg);
        },
        initLogHeight(Iframe) {
            let that = this;
            const iframeBox = document.getElementById(Iframe);
            iframeBox.onload = function () {
                window.addEventListener(
                    "message",
                    function (e) {
                        // if (e.data.height) {
                        //     iframeBox.style.height = e.data.height + "px";
                        // }
                        if (e.data.total) {
                            that.page.total = e.data.total;
                        }
                        if (e.data.height && !that.totalAry.includes(e.data)) {
                            that.totalAry.push(e.data);
                        }
                        console.log(e.data, Iframe, that.totalAry);
                    },
                    false
                );
            };
        },
        handleSizeChange(val) {
            this.page.limit = val;
        },
        handleCurrentChange(val) {
            this.page.current = val;
            this.send(`_g().gotoPage(${this.page.current})`);
        },
    },
};
