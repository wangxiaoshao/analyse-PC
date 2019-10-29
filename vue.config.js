const path = require('path');
const URL = require("url")
const CompressionPlugin = require("compression-webpack-plugin")

function resolve (dir) {
  return path.join(__dirname, dir)
}

// 正是环境地址前缀，最好是绝对地址
const publicPath= '';

module.exports = function (options) {
  options = options || {}
  return {
    publicPath: process.env.NODE_ENV === 'production' ? publicPath: '/',

    // 设置别名
    chainWebpack: (config) => {
      config.resolve.alias
        .set('@src', resolve('src'))
    },

    // 开启gzip压缩，需要服务端也开启gzip压缩，目前服务端未开启
    configureWebpack: config => {
      if (process.env.NODE_ENV === 'production') {
        return {
          plugins: [new CompressionPlugin({
            test: /\.js$|\.html$|\.css/, //匹配文件名
            threshold: 10240, //对超过10k的数据进行压缩
            deleteOriginalAssets: false //是否删除原文件
          })]
        }
      }
    },
    // development 环境默认走前端mock数据，test连接测试环境
    devServer: {
      //publicPath: publicPath,
      contentBase: ['dist', 'mock'],
      disableHostCheck: true,
      host: '0.0.0.0',
      port: '8080',
      proxy: {
        "/api/": {
          target: "http://192.168.0.104:8080",
          // pathRewrite: {
          //   "/api/": ""
          // }
        },
        '!**/*.json': {
          target: "http://127.0.0.1:8080",
          // target: "http://aedutest.17win.com",
          changeOrigin: true,
          bypass(req, res) {
            const urlObject = URL.parse(req.url);
            if (options.mock) {
              const mockPath = mockMap(urlObject.pathname);
              if (mockPath) {
                req.method = 'GET';
                return mockPath;
              }
            }
          }
        }
      }
    }
  }
}
