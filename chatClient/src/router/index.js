import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/main',
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import("@/views/login")
    },
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/views/layout'),
      redirect: '/main',
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/main',
          name: 'MainBox',
          component: () => import('@/views/MainBox'),
          redirect: 'main/chat',
          meta: {
            requiresAuth: true
          },
          children: [
            {
              path: 'chat',
              name: 'ChatList',
              component: () => import('@/views/chatuserlist/index'),
              redirect: 'chat/friend',
              meta: {
                requiresAuth: true
              },
              children: [
                {
                  path: 'friend',
                  name: 'Friend',
                  component: () => import('@/views/chatuserlist/components/Friend'),
                  meta: {
                    requiresAuth: true
                  }
                },
                {
                  path: 'group',
                  name: 'Group',
                  component: () => import('@/views/chatuserlist/components/Group'),
                  meta: {
                    requiresAuth: true
                  }
                }
              ]
            },
            {
              path: 'user/:id',
              name: 'UserDetail',
              component: () => import('@/views/UserDetail')
            },
            {
              path: 'group/:id',
              nameL: 'GroupDetail',
              component: () => import('@/views/GroupDetail')
            },
            {
              path: 'add',
              component: () => import('@/views/chatuserlist/components/Add')
            }
          ]
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
  //获取store里面的token
  // let userName = store.state.userName;
  let userName = sessionStorage.getItem('isLogin')
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth){
    if(userName){
      next();
    }else{
      alert('请先登录再进行此操作!')
      next({
        path: '/login',
        query: { redirect: to.fullPath }  // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
      } 
  }else{
    next();
  }
})

export default router
