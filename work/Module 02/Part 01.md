# 一、简答题
## 1，谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。
<p>
    前端工程化是指遵循一定的标准和规范，通过工具去提高效率，降低成本的一种手段。一切重复的工作都应该被自动化。实现前端工程化可以从 模块化、组件化、规范化、自动化等方面出发。

    1）可以解决 ES6+ 新特性，转换为低版本浏览器支持的 ES5 语法，实现兼容

    2）可以使用 Less / Sass / PostCSS 等进行样式的编写，然后进行转换为运行环境支持的Css语法

    3）可以使用模块化开发，减少重复的机械式工作

    4）可以使代码风格统一，保证质量。
</p>

## 2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？
<p>

    1）减少时间，不必从零开始搭建初始项目，提高开发效率。

    2）便于多人协作。

    3）项目更新同步方便，只需要更新代码库中项目模板，即可下载最新的项目。
</p>


# 编程题
## 1、概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具
<p>
    1）明确你的需求；
    
    2）找到合适的 Generator；
    
    3）全局范围安装找到的 Generator；
    
    4）通过 Yo 运行对应的 Generator；
    
    5）通过命令行交互填写选项；
    
    6）生成你所需要的项目结构；
</p>
脚手架代码：[https://gitee.com/zimeng303/lago-training-camp/tree/master/work/Module%2002/generator-alisone-react](https://gitee.com/zimeng303/lago-training-camp/tree/master/work/Module%2002/generator-alisone-react)
已发布

## 2、尝试使用 Gulp 完成项目的自动化构建
代码：[https://gitee.com/zimeng303/lago-training-camp/tree/master/work/Module%2002/pages-boilerplate](https://gitee.com/zimeng303/lago-training-camp/tree/master/work/Module%2002/pages-boilerplate)