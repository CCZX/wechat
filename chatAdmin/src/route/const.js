export const menus = [
  {
    title: '首页',
    icon: 'home',
    key: '/home'
  },
  {
    title: '普通用户',
    icon: 'user',
    key: '/home/user',
    subs: [
      {key: '/home/user/statistics', title: '用户统计', icon: 'area-chart',},
      {key: '/home/user/edit', title: '用户管理', icon: 'edit',},
    ]
  },
  {
    title: '群组管理',
    icon: 'team',
    key: '/home/group',
    subs: [
      {key: '/home/group/statistics', title: '查看群组', icon: ''},
      {key: '/home/group/edit', title: '修改群组', icon: ''},
    ]
  },
  {
    title: '管理员用户',
    icon: 'android',
    key: '/home/admin',
    subs: [
      {
        key: '/home/admin/manage',
        title: '管理员管理',
        icon: 'edit',
      },
    ]
  },
  {
    title: '静态资源',
    icon: 'wallet',
    key: '/home/statics',
    subs: [
      {key: '/home/statics/avatars', title: '头像', icon: ''},
    ]
  },
  {
    title: '反馈组件',
    icon: 'message',
    key: '/home/feedback',
    subs: [
      {key: '/home/feedback/modal', title: '对话框', icon: '',},
      {key: '/home/feedback/notification', title: '通知提醒框', icon: ''},
      {key: '/home/feedback/spin', title: '加载中', icon: '',}
    ]
  },
  {
    title: '其它',
    icon: 'bulb',
    key: '/home/other',
    subs:[
      {key: '/home/other/animation', title: '动画', icon: '',},
      {key: '/home/other/gallery', title: '画廊', icon: '',},
      {key:'/home/other/draft',title:'富文本',icon:''},
      {key:'/home/other/chart',title:'图表',icon:''},
      {key:'/home/other/loading',title:'加载动画',icon:''},
      {key:'/home/other/404',title:'404',icon:''},
      {key:'/home/other/springText',title:'弹性文字',icon:''},
    ]
  },
  {
    title: '关于',
    icon: 'info-circle-o',
    key: '/home/about'
  }
]
