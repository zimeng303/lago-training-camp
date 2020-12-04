# 说明文档

## 实现步骤

* 1，安装 webpack、webpack-cli、webpack-dev-server 模块，实现代码的打包、web服务器的开启等。

**注意**
 webpack 采用 webpack 4+ , webpack 5+ 无需安装 webpack-dev-server 模块，已将其内置在 webpack 中。

* 2, 在 webpack.common.js 配置公共信息

1. 配置 `mode`，告知 webpack 使用相应模式的内置优化。
2. 配置 `entry`，即使用 webpack 时的入口文件。
3. 配置 `output`，控制 webpack 如何向硬盘写入编译文件。
4. 配置 `module`，告知 webpack 如何处理项目中的不同类型的模块。
   
   只配置了 `rules` 属性，用来修改模块的创建方式，以及所使用何种解析器进行编译。
   
   * vue 文件：使用 `vue-loader` ，将 vue 文件中的 template/js/style 转换成 js 模块；使 js可以写es6、style样式可以scss或less；template可以加jade等；

   **注意**
   1、如果要使用vue-loader，需要在 webpack 中使用vue-loader自带的插件 `VueLoaderPlugin`。
   2、还要使用 `vue-template-compiler`，可用于将 Vue 2.0 模板预编译为渲染函数（template => ast => render），以避免运行时编译开销和 CSP 限制。大都数场景下，与 vue-loader一起使用，只有在编写具有非常特定需求的构建工具时，才需要单独使用它。`vue-template-compiler` 和 `vue` 版本要保持一致。

   * js 文件：使用 `babel-loader`，将 ES6 语法 编译为 ES5 语法；使用 `eslint-loader` ，进行代码语法、风格等的检测

   * 样式 文件：使用 `less-loader`、`css-loader`、`style-loader`，将 less 文件进行转换和注入

   * 图片文件：使用 `url-loader` 或 `file-loader`，对 图片文件 进行编译转换

5. 配置 `plugins`，用于以各种方式自定义 webpack 构建过程。

   * 使用 webpack 的内置插件 `DefinePlugin`，创建在编译时可以配置的全局常量

   * 使用 `VueLoaderPlugin` 插件，它是 `vue-loader` 中集成的插件，位置在 `vue-loader/lib/plugin`

   * 使用 `html-webpack-plugin` 插件，生成一个 HTML5 文件， 包括使用 script 标签的 body 中的所有 webpack 包。

   **注意**

   在这里面使用了模板，由于模板中使用模板引擎的写法，读取了 HtmlWebpackPlugin 的配置选项 title，因此必须配置 title 选项。

* 3，在 webpack.dev.js 配置文件中，使用 `webpack-dev-server` 开启热更新服务器

1. 使用 `webpack-merge` 中导出的 `merge` 方法，将 `webpack.common.js` 中的配置与本文件中的配置进行合并；

2. 修改 `mode`，改变工作模式为 `development` （开发模式）；

3. 配置 `devServer`，开启服务器

   * 配置 `port` 属性，指定服务器访问地址的端口号；

   * 配置 `open` 属性，服务器开始，自动唤起浏览器；

   * 配置 `hot` 属性，启用 webpack 的模块热替换特性；

   * 配置 `contentBase` 属性，告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。

4. 配置 `plugins` 属性，添加 webpack 的 `HotModuleReplacementPlugin` 插件，用于启用热替换模块(Hot Module Replacement)，也被称为 HMR。

* 4，在 webpack.prod.js 配置文件中，进行项目构建

1. 使用 `webpack-merge` 中导出的 `merge` 方法，将 `webpack.common.js` 中的配置与本文件中的配置进行合并；

2. 修改 `mode`，改变工作模式为 `production` （生产模式）；

3. 配置 `plugins` 属性，添加插件

   * 使用 `clean-webpack-plugin` 中导出的 `CleanWebpackPlugin` 插件，用于构建之前，清除上一次的构建目录；

   * 使用 `copy-webpack-plugin` 插件，将单个文件或整个目录复制到构建目录。

* 5，使用 `eslint`，对代码进行语法、风格等的检测
 
 使用 `yarn eslint --init` 生成 eslint 的配置文件。

* 6，在 package.json 中，进行 NPM Scripts 的配置

## 使用说明

### 开发模式下，开启服务器

yarn serve 

or

npm run serve

### 生产模式下，生成构建目录

yarn build

or

npm run build

### 执行代码检测

yarn lint

or

npm run lint


