# 一、简答题

## 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。

- 1，初始化参数： 从 shell 参数和配置文件合并参数，得出最终的参数
- 2，开始编译：从上一步获得的参数初始化 compiler 对象，加载所有的插件，通过run方法执行编译。
- 3，确定入口：根据配置文件的 entry 找出所有入口文件。
- 4，编译模块：从入口文件开始，递归解析Entry依赖的所有Module；对找到的 Module，会根据 Module.rules 里配置的 Loader 规则将模块进行翻译成compliation；
- 5，输出资源：根据入口和模块的依赖关系，组装成一个个包含多个模块的chunk，因此一个Chunk，就是一个Entry及其所有依赖的Module合并的结果。最后将 chunk 转换成一个单独的文件加入输出列表。
- 6，输出完成： 在确定好输出内容后，根据配置 Output 确定输出的路径和文件名，将文件的内容写入文件系统上。

在整个构建流程中，Webpack会在恰当的时机执行Plugin里定义的逻辑，从而完成Plugin插件的优化任务。

## 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

### Loader

Loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

处理一个文件可以使用多个loader，loader的执行顺序和配置中的顺序正好相反，也就是说最后一个loader最先执行，第一个loader最后执行。第一个执行的loader的返回值接收源文件内容作为参数，其他loader接收前一个执行的loader的返回值作为参数，最后执行的loader会返回此模块的JavaScript的源码。

### Plugin

loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。

Plugin，通过webpack内部的钩子机制，**在webpack构建的不同阶段执行一些额外的工作**，它的插件是一个函数或者是一个包含apply方法的对象，接受一个compile对象，通过webpack的钩子来处理资源。Plugin是在plugins中单独配置。类型为数组，每一项是一个plugin的实例，参数都通过构造函数传入。 



# 二、编程题



代码地址：[https://gitee.com/zimeng303/lago-training-camp/tree/master/work/Module%2002/vue-app-base](https://gitee.com/zimeng303/lago-training-camp/tree/master/work/Module%2002/vue-app-base)

说明文档：[https://gitee.com/zimeng303/lago-training-camp/blob/master/work/Module%2002/vue-app-base/README.self.md](https://gitee.com/zimeng303/lago-training-camp/blob/master/work/Module%2002/vue-app-base/README.self.md)