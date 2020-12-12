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
    this.mode = this.options.mode || 'hash'
    this.routeMap = {}
    this.current = ''
    // 当模式为 hash，初始进入时，进行拼接
    if (this.mode === 'hash') {
      window.location.hash = window.location.hash ? window.location.hash : '#/'
      this.current = window.location.hash
    }
    // 当模式为 history，初始进入时，进行拼接
    if (this.mode === 'history') {
      window.location.hash = ''
      this.current = window.location.pathname
    }
    console.log(window.location)
    this.data = _Vue.observable({
      current: this.current
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
    const self = this
    // 定义全局组件 router-link
    Vue.component('router-link', {
      // 使用 props 传递属性
      props: {
        to: String
      },
      render (h) {
        return h('a', {
          attrs: {
            href: self.mode === 'hash' ? '#' + this.to : this.to
          },
          class: {
            'router-link-active': this.to === '/',
            'router-link-exact-active': self.data.current === this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default]) // 获取默认插槽
      },
      methods: {
        clickHandler (e) {
          e.preventDefault()
          // 当模式为 hash 时，执行的操作
          if (self.mode === 'hash') {
            window.location.hash = this.to
          }
          // 当模式为 history 时，执行的操作
          if (self.mode === 'history') {
            history.pushState({}, '', this.to)
            this.$router.data.current = this.to
          }
        }
      }
    })

    // router-view
    _Vue.component('router-view', {
      render (h) {
        // 当路由路径是 hash 时，去掉 # ，以便获取对应的组件
        if (self.mode === 'hash') {
          if (self.data.current.startsWith('#')) {
            self.data.current = self.data.current.substr(1)
          }
        }
        const component = self.routeMap[self.data.current]
        return h(component)
      }
    })
  }

  initEvent () {
    // 当地址发生变化后，触发 onhashchange 事件
    window.addEventListener('hashchange', () => {
      const current = window.location.hash.substr(1)
      this.data.current = current || this.data.current
    })

    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}
