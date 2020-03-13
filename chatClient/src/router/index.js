import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/index',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import("@/views/login"),
      meta: {
        deepth: 0.5
      }
    },
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/views/layout'),
      redirect: 'index',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'index',
          name: 'Index',
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
          component: () => import('@/views/mzone'),
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

// router.beforeEach((to, from, next) => {
//   //获取store里面的token
//   // let userName = store.state.userName;
//   let userName = sessionStorage.getItem('isLogin')
//   //判断要去的路由有没有requiresAuth
//   if(to.meta.requiresAuth){
//     if(userName){
//       next();
//     }else{
//       alert('请先登录再进行此操作!')
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
//       });
//       } 
//   }else{
//     next();
//   }
// })

export default router
