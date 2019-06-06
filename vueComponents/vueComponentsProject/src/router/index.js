import Vue from 'vue'
import Router from 'vue-router'

// 引入页面
const carousel = resolve => { require(['@/page/example0.vue'], resolve) }

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/carousel',
      name: 'carousel',
      component: carousel
    }
  ]
})
