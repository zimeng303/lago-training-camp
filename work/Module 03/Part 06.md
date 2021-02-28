# 1. 说说 application/json 和 application/x-www-form-urlencoded 二者之间的区别。

**application/x-www-form-urlencoded** 方式是 jQuery 中 Ajax 请求的默认方式，这种方式的好处就是浏览器都支持，在请求发送过程中会对数据进行序列化处理，以键值对 `key1=value1&key2=value2` 的方式发送到服务器，如果用 jQuery，它内部已经进行了处理，如果自己写原生的Ajax请求，就需要自己对数据进行序列化。

**application/json**，随着json规范的越来越流行，并且浏览器支持程度原来越好，许多开发人员以 `application/json` 作为请求 `content-type`，告诉服务器请求的主题内容是json格式的字符串，服务器端会对json字符串进行解析，这种方式的好处就是前端人员不需要关心数据结构的复杂度，只要是标准的json格式就能提交成功，application/json 数据格式越来越得到开发人员的青睐。

# 2. 说一说在前端这块，角色管理你是如何设计的。

* 1，划分功能：查询角色列表，根据条件查询角色列表，添加角色，编辑角色信息，删除角色，分配菜单，分配资源
* 2，根据功能，可以划分为五个组件，其中一个父组件（index.vue），其余的分别为：查询角色列表、根据条件查询角色列表 以及 删除角色功能 组成的组件（List.vue），添加角色和编辑角色信息功能 组成的组件（CreateOrUpdate.vue），分配菜单功能 组成的组件（alloc-menu.vue），以及分配资源功能 组成的组件（alloc-resource.vue）
* 3，添加角色和修改角色公用一个组件，根据接收不同的传值，展示不同的效果
* 4，根据角色不同，分配不同的菜单和资源，即 给角色分配不同的权限。

# 3. @vue/cli 跟 vue-cli 相比，@vue/cli 的优势在哪？

* 1，`@vue/cli` 是一个全局安装的 npm 包，提供了终端里的 `vue` 命令。

* 2，它可以通过 `vue create` 快速搭建一个新项目

* 3，可以直接通过 `vue serve` 构建新想法的原型

* 4，@vue/cli 提供了GUI 维护界面，可以通过图形化界面管理你的所有项目

  * 启动 @vue/cli GUI 界面

  ```powershell
  #查看Vue-Cli版本
  vue -V 
  # 启动 @vue/cli GUI 界面
  vue ui
  Ready on http://localhost:8000 #复制到浏览器即可打开
  ```

  ![image-20210228125149991](F:\LaGou\03-module\06-min-module\assets\image-20210228125149991.png)

# 4. 详细讲一讲生产环境下前端项目的自动化部署的流程。

**自动化部署的方式**

* Jenkins
* Gitlab CI
* GitHub Actions
* Travis CI
* Circle CI
* ......

此处以 `GitHub Actions` 为例，自动化部署流程，如下所示：

* 1，把代码提交到 GitHub 远程仓库

* 2，配置 GitHub Access Token

* 3，配置 GitHub Actions 执行脚本，在项目根目录创建 .github/workflows/main.yml 文件

  ```yml
  name: Publish And Deploy Demo
  # 提交 以 V 开头的命令时，才会触发自动部署
  on:
    push:
      tags:
        - 'v*'
  
  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest
      steps:
  
      # 下载源码
      - name: Checkout
        uses: actions/checkout@master
  
      # 打包构建
      - name: Build
        uses: actions/setup-node@master
      - run: npm install
      - run: npm run build
      - run: tar -zcvf release.tgz .nuxt static nuxt.config.js package.json package-lock.json pm2.config.json
  
      # 发布 Release
      - name: Create Release
        id: create_release
        uses: actions/create-release@master
        env:
          GITHUB_TOKEN: ${{ secrets.TOKEN }} # TOKEN 对应我们添加的 secret name
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false
  
      # 上传构建结果到 Release
      - name: Upload Release Asset
        id: upload-release-asset
        uses: actions/upload-release-asset@master
        env:
          GITHUB_TOKEN: ${{ secrets.TOKEN }}
        with:
        	# release 上传路径、名称配置
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ./release.tgz
          asset_name: release.tgz
          asset_content_type: application/x-tgz
  
      # 部署到服务器
      - name: Deploy
        uses: appleboy/ssh-action@master
        with:
        	# 在 Secrets 中，配置下面属性
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          password: ${{ secrets.PASSWORD }}
          port: ${{ secrets.PORT }}
          # 下面的 release 地址 ，修改为 自己的
          script: |
            rm -rf /root/realworld-nuxtjs/
            mkdir /root/realworld-nuxtjs
            cd /root/realworld-nuxtjs          
            wget https://github.com/zimeng303/realworld-nuxt/releases/latest/download/release.tgz -O release.tgz
            tar zxvf release.tgz
            npm install --production
            pm2 reload pm2.config.json
  ```

* 4，修改配置

  * 配置中，所用到的下载资源地址，修改为自己项目所在的远程仓库地址
  * 将所需用到的 HOST 、PORT、USERNAME、PASSWORD ，配置到 Secrets 中

* 5，配置 PM2 配置文件，根目录下，新建 pm2.config.json

  ```json
  {
      "apps": [
          {
              "name": "RealWorld",
              "script": "npm",
              "args": "start"
          }
      ]
  }
  ```

* 6，提交更新，开始自动化部署
  * 使用 `git add .` 将代码暂存到本地
  * 使用 `git tag 版本号` 新建标签
  * 使用 `git tag` 查看创建的标签
  * 使用 `  git push origin 版本号` 将代码推送到对应的 远程 tag 中，触发自动化部署脚本，开始自动化部署

**详情参见：**[【前端自动化构建】之 自动化部署](https://blog.csdn.net/zimeng303/article/details/114218956)

# 5. 你在开发过程中，遇到过哪些问题，又是怎样解决的？请讲出两点。

* 在使用 ElementUI 的表格组件时，由于采用了分页，在使用 checkbox 时，需要实现跨页多选
  * 解决方案是，经过和后端的协商，添加了一个字段，用于区分是否被选中
* 在项目中，使用了事件委托，导致了点击事件多次执行问题
  * 解决方案是，使用 **`off()`** 方法移除之前添加的事件处理程序。

# 6. 针对新技术，你是如何过渡到项目中？

* 首先，进行技术的预判，查看该技术是否成型以及技术的稳定性如何
* 其次，查看该技术在遇到问题时是否能有解决的方案
* 然后，通过查看新技术的官方文档，查看是否适合直接过渡到现在的项目中
* 最后，基本都没问题了，会在新的项目中使用部分功能，不会将老项目全部迁移。

