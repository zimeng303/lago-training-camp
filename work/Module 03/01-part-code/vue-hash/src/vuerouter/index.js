let _Vue = null

export default class VueRouter {
  // 使用 Vue.use() 注册插件时，此方法被调用
  static install (Vue) {
    // 判断当前插件是否已被安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true

    _Vue = Vue

    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  constructor (options) {
    this.options = options
    this.routeMap = {}
    // 当模式为 hash，初始进入时，进行拼接
    window.location.hash = window.location.hash ? window.location.hash : '#/'
    console.log(window.location.hash)
    this.data = _Vue.observable({
      current: window.location.hash
    })
  }

  init () {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  createRouteMap () {
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  // 初始化组件
  initComponents (Vue) {
    // 定义全局组件 router-link
    Vue.component('router-link', {
      // 使用 props 传递属性
      props: {
        to: String
      },
      render (h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default]) // 获取默认插槽
      },
      methods: {
        clickHandler (e) {
          window.location.hash = this.to
          e.preventDefault()
        }
      }
    })

    const self = this
    // router-view
    _Vue.component('router-view', {
      render (h) {
        // 当路由路径是 hash 时，默认指向 /，获取对应的组件
        self.data.current = self.data.current === '#/' ? '/' : self.data.current
        const component = self.routeMap[self.data.current]
        return h(component)
      }
    })
  }

  initEvent () {
    window.addEventListener('hashchange', () => {
      this.data.current = window.location.hash.substr(1)
    })
  }
}
