const path = require('path')

// 将 静态文件拷贝到构建目录
const Webpack = require('webpack')

// 导入 VueLoaderPlugin 
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 根据 模板 生成 HTML文件
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    // 设置工作模式
    mode: 'none',
    // 设置入口文件
    entry: './src/main.js',
    // 设置输出文件
    output: {
        filename: 'js/[name].bundle.js', // 输出文件名
        path: path.join(__dirname, 'dist') // 输出文件目录
    },
    module: {
        // 编写模块匹配规则，执行相应的 loader
        rules: [
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        attributes: {
                            list: [
                                {
                                    tag: 'img',
                                    attribute: 'src',
                                    type: 'srcset',
                                },
                                {
                                    tag: 'link',
                                    attribute: 'href',
                                    type: 'src',
                                }
                            ]
                        }
                    }
                }
            },
            {
                test: /\.js$/,
                use: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'img',
                        limit: 10 * 1024,
                        esModule: false,
                    }
                }
            }
        ]
    },
    plugins: [
        new Webpack.DefinePlugin({
            BASE_URL: JSON.stringify('./')
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'Webpack Vue',
            filename: 'index.html',
            template: './public/index.html'
        })
    ]
}
