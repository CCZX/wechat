import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/chat',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import("@/views/Login"),
      meta: {
        deepth: 0.5
      }
    },
    {
      path: '/chat',
      name: 'Layout',
      component: () => import('@/views/layout'),
      redirect: '/chat/home',
      meta: {
        requiresAuth: true,
        keepAlive: true
      },
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('@/views/Index'),
          meta: {
            requiresAuth: true,
            keepAlive: true,
            deepth: 1
          },
        },
        {
          path: 'user/:id',
          name: 'UserDetails',
          component: () => import('@/views/UserDetails'),
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'add',
          name: 'Add',
          component: () => import('@/views/Add'),
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'setting',
          name: 'Setting',
          component: () => import('@/views/Setting'),
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'system',
          name: 'System',
          component: () => import('@/views/SystemNews'),
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'mzone',
          name: 'MZone',
          component: () => import('@/views/MZone/index'),
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'editor',
          name: 'Editor',
          component: () => import('@/views/MZone/editorBlog'),
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'schedule',
          name: 'Schedule',
          component: () => import('@/views/Schedule'),
          meta: {
            requiresAuth: true
          },
        },
        {
          path: 'blog/:id',
          name: 'BlogInfo',
          component: () => import('@/views/BlogInfo'),
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('@/views/404')
    }
  ]
})


router.beforeEach((to, from, next) => {
  /**tips:需要在钩子函数内读取登录状态 */
  const userIsLogin = store.state.user.isLogin
  if(to.meta.requiresAuth){
    if(userIsLogin){
      next()
    }else{
      // alert('请先登录再进行此操作!')
      next({
        path: '/login',
        /** 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由 */
        query: { redirect: to.fullPath }
      })
    } 
  }else{
    next()
  }
})

export default router
