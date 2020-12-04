const path = require('path')

const Webpack = require('webpack')
// 导入 webpack-merge 模块，连接数组并合并对象，而不会覆盖组合
const { merge } = require('webpack-merge')
// 导入 公共配置模块
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        port: '8080',    // 设置端口号
        open: true,    // 启动服务，自动开启浏览器
        hot: true,     // 热更新
        contentBase: [
            path.join(__dirname, "public")
        ]
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin()
    ]
})