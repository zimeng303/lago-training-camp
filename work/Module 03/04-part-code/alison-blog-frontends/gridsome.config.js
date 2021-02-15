// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Logo',
  siteUrl: `${process.env.GRIDSOME_API_URL}/imgs/logo.svg`,
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: process.env.GRIDSOME_API_URL, // 接口地址
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['project', 'journal'], // 查询的数据类型
        singleTypes: ['hero'], // 单个节点
      }
    }
  ],
  templates: {
    StrapiProject: [
      {
        path: '/projects/:name/:id',
        component: './src/templates/Project.vue'
      }
    ],
    StrapiJournal: [
      {
        path: '/journal/:name/:id',
        component: './src/templates/Journal.vue'
      }
    ],
  }
}
