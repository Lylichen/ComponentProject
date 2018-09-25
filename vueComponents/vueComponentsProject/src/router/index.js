import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Loading1 from '@/page/loading-1.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/loading-1',
      name: 'Loading1',
      component: Loading1
    }
  ]
})
