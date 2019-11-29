import Vue from 'vue'
import Router from 'vue-router'
// import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      // route level code-splitting
      // this generates a separate chunk (index.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "index" */ './views/Index.vue')
    }
  ]
})
