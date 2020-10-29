const path = require("path");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

function resolve(dir) {
    return path.join(__dirname, dir);
}

// 正是环境地址前缀，最好是绝对地址
const publicPath = "";
module.exports = function (options) {
    options = options || {};
    return {
        publicPath: process.env.NODE_ENV === "production" ? publicPath : "/",

        // 设置别名
        chainWebpack: (config) => {
            config.resolve.alias.set("@src", resolve("src"));
        },
        productionSourceMap: false,
        configureWebpack: (config) => {
            if (process.env.NODE_ENV !== "production") {
                config.devtool = "source-map";
            }

            let gitRevisionPlugin = new GitRevisionPlugin();
            config.plugins.push(gitRevisionPlugin);

            if (config.mode === "production") {
                let fileManagePlugin = new FileManagerPlugin({
                    onEnd: {
                        delete: ["./dist.zip"],
                        archive: [
                            { source: "./dist", destination: "./dist.zip" },
                        ],
                    },
                });
                config.plugins.push(fileManagePlugin);
            }
        },

        devServer: {
            // publicPath: publicPath,
            contentBase: ["dist"],
            disableHostCheck: true,
            host: "0.0.0.0",
            port: "8080",
            proxy: {
                "/api/": {
                    // target: "http://192.168.1.186",
                    // target: "http://jg-dev.lonmo.com/",
                    //  target: "http://10.226.9.210/",
                    // target: "http://59.215.232.95/",
                    //         target: "http://org.gz.cegn.cn/",
                    // target: "http://txl.org.gz.cegn.cn/",
                    target: "http://172.18.1.91:8080/",
                    changeOrigin: true,
                    // target: "http://10.226.11.177/",
                    //  changeOrigin: true,
                    // http:"//jg-dev.lonmo.com",
                    // pathRewrite: {
                    //   "/api/": ""
                    // }
                },
            },
        },
    };
};
